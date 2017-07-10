"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const store_1 = require("../store");
class UserContoller {
    constructor() {
        this.collection = store_1.default.db.collection('users');
    }
    getAllUsers() {
        return new Promise((resolve, reject) => {
            this.collection.find({}).toArray((e, r) => {
                if (e) {
                    reject(e);
                }
                resolve(r);
            });
        });
    }
    getUserById(id) {
        return new Promise((resolve, reject) => {
            this.collection.findOne({
                _id: new mongodb_1.ObjectID(id)
            }, (e, r) => {
                if (e) {
                    reject(e);
                }
                resolve(r);
            });
        });
    }
    addUser(newUser) {
        return new Promise((resolve, reject) => {
            this.collection.insertOne(newUser, (e, r) => {
                if (e) {
                    reject(e);
                }
                resolve(r);
            });
        });
    }
    deleteUserById(id) {
        return new Promise((resolve, reject) => {
            this.collection.deleteOne({
                _id: new mongodb_1.ObjectID(id)
            }, (e, r) => {
                if (e) {
                    reject(e);
                }
                if (r.result.n === 0) {
                    reject();
                }
                resolve(r);
            });
        });
    }
}
exports.default = UserContoller;
