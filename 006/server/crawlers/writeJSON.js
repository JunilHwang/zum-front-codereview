// @ts-check
import { constants, createReadStream, createWriteStream } from "fs";
import { access } from "fs/promises";

import { streamEventTypes } from "../types";

/**
 * writeJSONSync - 크롤링 데이터를 JSON 형태로 저장
 * - Buffer 형태 readFile, writeFile 보다는 Stream 형태 활용해 메모리 사용량 줄임
 * - 먼저 해당 JSON이 있는지 확인하고
 * - 있으면 readStream으로 가져와서 id를 key로 하는 객체로 parsing
 * - path에 새로운 데이터 추가
 * @param {string} path - 저장할 경로 및 파일명
 * @param {import("../types").CardInfo[] | import("../types").DetailInfo[] | import("../types").Rankings[]} dataArr
 */
const writeJSON = (path, dataArr) => {
  // 기존 JSON 확인 후 있는 경우에만 기존 data 복사
  const prevChunks = [];
  let prevData = {};
  access(path, constants.F_OK).then(() => {
    const readStream = createReadStream(path);
    readStream
      .on(streamEventTypes.data, (chunk) => {
        prevChunks.push(chunk);
      })
      .on(streamEventTypes.end, () => {
        prevData = Buffer.concat(prevChunks).toJSON();
      });
  });

  try {
    const concatWithPrev = { ...prevData };
    for (const datum of dataArr) {
      const { idx } = datum;
      if (!prevData[idx]) concatWithPrev[idx] = datum;
    }
    const data = JSON.stringify(concatWithPrev);

    const writeStream = createWriteStream(path, {
      flags: streamEventTypes.write,
    });
    writeStream.on(streamEventTypes.finish, () => {
      console.log("SUCCESS to make JSON file: " + path);
    });
    writeStream.write(data);
    writeStream.end();
  } catch (e) {
    console.log("FAIL to make JSON file: " + path);
    console.error(e);
  }
};

export default writeJSON;
