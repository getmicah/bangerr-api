"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../store");
class UserContoller {
    constructor() {
        this.collection = store_1.default.db.collection('users');
    }
    getAllUsers() {
        return new Promise((resolve, reject) => {
            this.collection.find({}).toArray((err, doc) => {
                if (err) {
                    reject(err);
                }
                resolve(doc);
            });
        });
    }
    getUserById(id) {
        return new Promise((resolve, reject) => {
            this.collection.findOne({ id }, (err, doc) => {
                if (err) {
                    reject(err);
                }
                resolve(doc);
            });
        });
    }
    addUser(newUser) {
        return new Promise((resolve, reject) => {
            this.collection.insertOne(newUser, (err, doc) => {
                if (err) {
                    reject(err);
                }
                resolve(doc);
            });
        });
    }
    deleteUserById(id) {
        return new Promise((resolve, reject) => {
            this.collection.deleteOne({ id }, (err, doc) => {
                if (doc.n === 0) {
                    // doesnt exist
                    reject();
                }
                resolve();
            });
        });
    }
}
exports.default = UserContoller;
