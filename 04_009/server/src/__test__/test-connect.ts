import connect from '@/config/db-config';
import fs from 'fs';

class TestConnect {
  public clear() {
    const dbPath = `${process.env.DB}.json`;
    try {
      fs.accessSync(dbPath);
      fs.unlinkSync(dbPath);
    } catch (err) {
      console.error(err);
    }
  }

  public delete() {
    const tables = ['/post'];
    tables.forEach((table) => {
      connect().push(table, []);
    });
  }
}

export default TestConnect;
