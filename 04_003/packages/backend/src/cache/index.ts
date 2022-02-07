type DataObject = {
  [propsName: string]: any;
};

const Cache = (() => {
  const storage = new Map();

  return {
    createStorage: (modelName: string) => {
      const objectStorage = new Map();
      storage.set(modelName, {
        name: modelName,
        storage: objectStorage,
        setCache: (key: string, data: DataObject) => {
          objectStorage.set(key, data);
        },
        getCache: (key: string) => {
          return objectStorage.get(key);
        },
        deleteCache: (key: string) => {
          objectStorage.delete(key);
        },
      });
      return storage.get(modelName);
    },
    deleteStorage: (modelName: string) => {
      storage.delete(modelName);
    },
  };
})();

export const createCacheKey = (modelName: string, id: string) =>
  `${modelName}-${id}`;

export default Cache;
