import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

type DataType = 'STRING' | 'TEXT' | 'INTEGER' | 'FLOAT' | 'DATE';

type ModelConfig = {
  type: DataType;
  config?: {
    allowNull?: boolean;
    isPrimaryKey?: boolean;
    defaultValue?: string | number;
    maxLength?: number;
  };
};

interface DataConfig extends ModelConfig {
  name: string;
}

type DataObject = {
  [propsName: string]: any;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Database = (() => {
  const MODEL_PATH = `${__dirname}/../models`;
  const DATABASE_PATH = __dirname;
  const STORAGE_PATH = `${DATABASE_PATH}/storage`;
  const CONFIG_PATH = `${STORAGE_PATH}/config.json`;

  const autoIncrementID = new Map();

  const getTableList: () => string[] = () => {
    return fs
      .readdirSync(STORAGE_PATH)
      .map((name: string) => name.replace(/.json/g, ''));
  };

  const isTableExist: (tableName: string) => boolean = (tableName: string) => {
    const tableList = getTableList();
    return tableList.includes(tableName);
  };

  const getTableData: (tableName: string) => DataObject = (
    tableName: string,
  ) => {
    return JSON.parse(
      fs.readFileSync(`${STORAGE_PATH}/${tableName}.json`, 'utf-8'),
    );
  };

  const writeTableData: (tableName: string, data: object) => void = (
    tableName: string,
    data: object,
  ) => {
    const originData = getTableData(tableName);

    fs.writeFileSync(
      `${STORAGE_PATH}/${tableName}.json`,
      JSON.stringify({
        ...originData,
        ...data,
      }),
    );
  };

  const createID: (tableName: string) => string = (tableName: string) =>
    `${tableName}ID`;

  if (!fs.readdirSync(DATABASE_PATH).includes('storage')) {
    fs.mkdirSync(STORAGE_PATH);
  }

  if (!isTableExist('config')) {
    fs.openSync(CONFIG_PATH, 'w');
    fs.writeFileSync(CONFIG_PATH, JSON.stringify({}));
  }

  return {
    init: () => {
      const modelList = fs.readdirSync(MODEL_PATH);
      modelList.forEach(async model => {
        if (model.slice(-3) === '.js') {
          const modelObject = await import(`../models/${model}`);
          const { tableName, tableInfo } = modelObject.default;
          Database.createTable(tableName, tableInfo);
        }
      });
    },
    createTable: (tableName: string, tableConfig: DataObject) => {
      if (isTableExist(tableName)) {
        throw new Error('해당 테이블이 이미 존재합니다.');
      }

      const TABLE_PATH = `${STORAGE_PATH}/${tableName}.json`;

      fs.openSync(TABLE_PATH, 'w');
      fs.writeFileSync(TABLE_PATH, JSON.stringify({}));

      autoIncrementID.set(createID(tableName), 1);

      const originConfig = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));

      fs.writeFileSync(
        CONFIG_PATH,
        JSON.stringify({ ...originConfig, [tableName]: tableConfig }),
      );
    },

    truncateTable: (tableName: string) => {
      if (isTableExist(tableName)) {
        writeTableData(tableName, {});
      } else {
        throw new Error('테이블이 존재하지 않습니다.');
      }
    },

    removeTable: (tableName: string) => {
      if (isTableExist(tableName)) {
        const TABLE_PATH = `${STORAGE_PATH}/${tableName}.json`;

        fs.unlinkSync(TABLE_PATH);

        autoIncrementID.delete(createID(tableName));

        const originConfig: { [key: string]: DataConfig } = JSON.parse(
          fs.readFileSync(CONFIG_PATH, 'utf-8'),
        );
        delete originConfig[tableName];

        fs.writeFileSync(CONFIG_PATH, JSON.stringify({ ...originConfig }));
      } else {
        throw new Error('테이블이 존재하지 않습니다.');
      }
    },

    create: (tableName: string, payload: DataObject) => {
      const originData = getTableData(tableName);
      const currentID = autoIncrementID.get(createID(tableName));

      writeTableData(tableName, {
        ...originData,
        [currentID]: payload,
      });

      autoIncrementID.set(createID(tableName), currentID + 1);

      return { id: currentID, ...payload };
    },

    read: (tableName: string, payload: DataObject) => {
      const originData = getTableData(tableName);
      const originIDList = Object.keys(originData);

      const compareValue = Object.keys(payload);
      let data = null;

      for (const id of originIDList) {
        const targetData: DataObject = originData[id];
        if (
          compareValue.every(valueKey => {
            if (valueKey === 'id') {
              return payload[valueKey] === parseInt(id, 10);
            }
            return payload[valueKey] === targetData[valueKey];
          })
        ) {
          data = targetData;
        }
      }

      return data;
    },

    readAll: (tableName: string) => {
      const originData = getTableData(tableName);
      const originIDList = Object.keys(originData);

      const data: DataObject = [];

      originIDList.forEach(id => {
        data.push({ id, ...originData[id] });
      });

      return data;
    },

    update: (tableName: string, id: string, payload: DataObject) => {
      const originData = getTableData(tableName);
      const originIDList = Object.keys(originData);

      if (originIDList.includes(id)) {
        writeTableData(tableName, {
          ...originData,
          [id]: payload,
        });
        return;
      }
      throw new Error('id의 데이터가 테이블에 존재하지 않습니다.');
    },

    delete: (tableName: string, id: string) => {
      const originData = getTableData(tableName);
      const originIDList = Object.keys(originData);

      if (originIDList.includes(id)) {
        delete originData[id];
        fs.writeFileSync(
          `${STORAGE_PATH}/${tableName}.json`,
          JSON.stringify({
            ...originData,
          }),
        );
        return;
      }
      throw new Error('id의 데이터가 테이블에 존재하지 않습니다.');
    },
  };
})();

Database.init();

export default Database;
