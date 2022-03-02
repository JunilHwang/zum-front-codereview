import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import dotEnvConfig from '@/config/dot-env-config';

dotEnvConfig();

const obj1 = { title: '제목', user: '유저', content: '내용' };
const obj2 = { title: '제목22', user: '유저22', content: '내용22' };

const arr = [];
for (let i = 1; i <= 500; i++) {
  arr.push({ ...obj1, id: i, date: new Date() });
}
for (let i = 501; i <= 1000; i++) {
  arr.push({ ...obj2, id: i, date: new Date() });
}
const db = new JsonDB(new Config(process.env.DB as string, true, true, '/'));
db.push('/post', arr);
