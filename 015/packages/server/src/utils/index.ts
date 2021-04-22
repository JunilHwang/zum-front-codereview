import fs from 'fs';

const maxCacheSize = 5;

const jsonHelper = {
  read(path: string) {
    const text = fs.readFileSync(path, 'utf-8');
    return JSON.parse(text);
  },
  write(path: string, data: string | NodeJS.ArrayBufferView) {
    fs.writeFileSync(path, data, 'utf-8');
  },
};

const cache = {
  cache: new Map(),
  has(key: string) {
    return this.cache.has(key);
  },
  get(key: string) {
    const value = this.cache.get(key);

    if (value === undefined) return value;

    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  },
  save(key: string, value: any) {
    if (this.cache.size < maxCacheSize) {
      return this.cache.set(key, value);
    }

    if (this.cache.has(key)) return;

    const {
      value: [firstKey],
    } = this.cache[Symbol.iterator]().next();

    this.cache.delete(firstKey);
    this.cache.set(key, value);
  },
};

export { jsonHelper, cache };
