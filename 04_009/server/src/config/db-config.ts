import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

const connect = () => new JsonDB(new Config("zum", true, true, '/'));

export default connect;
