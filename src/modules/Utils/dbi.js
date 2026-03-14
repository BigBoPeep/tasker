export default class DBI {
  #db = null;
  #dbName;
  #version;
  #stores;
  #keyPaths;
  #indexes;

  constructor({ DB_NAME, VERSION, STORES, KEYPATHS, INDEXES }) {
    this.#dbName = DB_NAME;
    this.#version = VERSION;
    this.#stores = STORES;
    this.#keyPaths = KEYPATHS;
    this.#indexes = INDEXES;
  }

  async #ensureOpen() {
    if (!this.#db) await this.open();
  }

  async open() {
    if (this.#db) return this.#db;
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.#dbName, this.#version);
      req.onerror = () => {
        reject(new Error(`Error Opening DB: ${req.error}`));
      };
      req.onsuccess = () => {
        this.#db = req.result;
        resolve(this.#db);
      };
      req.onupgradeneeded = () => {
        const db = req.result;
        this.#stores.forEach((storeName) => {
          if (db.objectStoreNames.contains(storeName))
            db.deleteObjectStore(storeName);
          if (!db.objectStoreNames.contains(storeName)) {
            const store = db.createObjectStore(
              storeName,
              storeName in this.#keyPaths
                ? this.#keyPaths[storeName]
                : this.#keyPaths["default"],
            );
            if (storeName in this.#indexes) {
              this.#indexes[storeName].forEach((newIndex) => {
                store.createIndex(
                  newIndex.name,
                  newIndex.keyPath,
                  newIndex.options || {},
                );
              });
            }
          }
        });
      };
    });
  }

  async add(storeName, item) {
    await this.#ensureOpen();
    return new Promise((resolve, reject) => {
      const trans = this.#db.transaction(storeName, "readwrite");
      const store = trans.objectStore(storeName);
      const req = store.add(item);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () =>
        reject(
          new Error(
            `DBI: Failed to add [ITEM: ${item}:${typeof item}] to [STORE: ${storeName}:${typeof storeName}] ` +
              `: [REASON: ${req.error}]`,
          ),
        );
    });
  }

  async put(storeName, item) {
    await this.#ensureOpen();
    return new Promise((resolve, reject) => {
      const trans = this.#db.transaction(storeName, "readwrite");
      const store = trans.objectStore(storeName);
      const req = store.put(item);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () =>
        reject(
          new Error(
            `DBI: Failed to put [ITEM: ${item}:${typeof item}] to [STORE: ${storeName}:${typeof storeName}] ` +
              `: [REASON: ${req.error}]`,
          ),
        );
    });
  }

  async get(storeName, key) {
    await this.#ensureOpen();
    return new Promise((resolve, reject) => {
      const trans = this.#db.transaction(storeName, "readonly");
      const store = trans.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () =>
        reject(
          new Error(
            `DBI: Failed to get [KEY: ${key}:${typeof key}] from [STORE: ${storeName}:${typeof storeName}] ` +
              `: [REASON: ${req.error}]`,
          ),
        );
    });
  }

  async getAll(storeName) {
    await this.#ensureOpen();
    return new Promise((resolve, reject) => {
      const trans = this.#db.transaction(storeName, "readonly");
      const store = trans.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () =>
        reject(
          new Error(
            `DBI: Failed to get all items in [STORE: ${storeName}:${typeof storeName}] : [REASON: ${req.error}]`,
          ),
        );
    });
  }

  async getKeyByIndex(storeName, indexName, query) {
    await this.#ensureOpen();
    return new Promise((resolve, reject) => {
      const trans = this.#db.transaction(storeName, "readonly");
      const store = trans.objectStore(storeName);
      if (!store.indexNames.contains(indexName)) {
        reject(
          new Error(
            `DBI: [INDEX: ${indexName}:${typeof indexName}] does not exist in [STORE: ${storeName}:${typeof storeName}]`,
          ),
        );
      }
      const index = store.index(indexName);
      const req = index.getKey(query);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () =>
        reject(
          new Error(
            `DBI: Failed to find key for [QUERY: ${query}:${typeof query}] with [INDEX: ${indexName}:${typeof indexName}] ` +
              `in [STORE: ${storeName}:${typeof storeName}] : [REASON: ${req.error}]`,
          ),
        );
    });
  }

  async delete(storeName, key) {
    await this.#ensureOpen();
    return new Promise((resolve, reject) => {
      const trans = this.#db.transaction(storeName, "readwrite");
      const store = trans.objectStore(storeName);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () =>
        reject(
          new Error(
            `DBI: Failed to delete [KEY: ${key}:${typeof key}] from [STORE: ${storeName}:${typeof storeName}] ` +
              `: [REASON: ${req.error}]`,
          ),
        );
    });
  }

  async clear(storeName) {
    await this.#ensureOpen();
    return new Promise((resolve, reject) => {
      const trans = this.#db.transaction(storeName, "readwrite");
      const store = trans.objectStore(storeName);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () =>
        reject(
          new Error(
            `DBI: Failed to clear items from [STORE: ${storeName}:${typeof storeName}] : [REASON: ${req.error}]`,
          ),
        );
    });
  }

  async count(storeName) {
    await this.#ensureOpen();
    return new Promise((resolve, reject) => {
      const trans = this.#db.transaction(storeName, "readonly");
      const store = trans.objectStore(storeName);
      const req = store.count();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () =>
        reject(
          new Error(
            `DBI: Failed to count items in [STORE: ${storeName}:${typeof storeName}] : [REASON: ${req.error}]`,
          ),
        );
    });
  }

  async queryByIndex(storeName, indexName, query) {
    await this.#ensureOpen();
    return new Promise((resolve, reject) => {
      const trans = this.#db.transaction(storeName, "readonly");
      const store = trans.objectStore(storeName);
      if (!store.indexNames.contains(indexName))
        reject(
          new Error(
            `DBI: [INDEX: ${indexName}:${typeof indexName}] does not exist in [STORE: ${storeName}:${typeof storeName}]`,
          ),
        );
      const index = store.index(indexName);
      const req = index.getAll(query);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () =>
        reject(
          new Error(
            `DBI: Failed get all items with [QUERY: ${query}:${typeof query}] in [INDEX: ${indexName}:${typeof indexName}] ` +
              `from [STORE: ${storeName}:${typeof storeName}] : [REASON: ${req.error}]`,
          ),
        );
    });
  }

  async cursor(storeName, callback, mode = "readonly") {
    await this.#ensureOpen();
    return new Promise((resolve, reject) => {
      const trans = this.#db.transaction(storeName, mode);
      const store = trans.objectStore(storeName);
      const req = store.openCursor();
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          callback(cursor);
          cursor.continue();
        } else resolve();
      };
      req.onerror = () =>
        reject(
          new Error(
            `DBI: Cursor operation failed on [STORE: ${storeName}:${typeof storeName}] : [REASON: ${req.error}]`,
          ),
        );
    });
  }

  close() {
    if (this.#db) {
      this.#db.close();
      this.#db = null;
    }
  }
}
