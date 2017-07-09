"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const config_1 = require("./config");
class Store {
    init() {
        return new Promise((resolve, reject) => {
            mongodb_1.MongoClient.connect(config_1.default.database.getUrl(), (err, db) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                this.db = db;
                resolve();
            });
        });
    }
}
exports.default = new Store();
