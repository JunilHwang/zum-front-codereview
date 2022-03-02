class Cache {
  private store = new Map();

  addData(id: number, data: any) {
    this.store.set(id, data);
  }

  getDataById(id: number) {
    return this.store.get(id);
  }

  clearAllData() {
    this.store.clear();
  }
}

export default new Cache();
