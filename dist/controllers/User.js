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
                    return reject(e);
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
                    return reject(e);
                }
                resolve(r);
            });
        });
    }
    getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            this.collection.findOne({ username }, (e, r) => {
                if (e) {
                    return reject(e);
                }
                resolve(r);
            });
        });
    }
    addUser(newUser) {
        return new Promise((resolve, reject) => {
            this.getUserByUsername(newUser.username)
                .then((r) => {
                // dont create duplicate users
                if (r !== null) {
                    return reject();
                }
                this.collection.insertOne(newUser, (e, r) => {
                    if (e) {
                        return reject(e);
                    }
                    resolve(r);
                });
            })
                .catch((e) => {
                reject(e);
            });
        });
    }
    deleteUserById(id) {
        return new Promise((resolve, reject) => {
            this.collection.deleteOne({
                _id: new mongodb_1.ObjectID(id)
            }, (e, r) => {
                if (e) {
                    return reject(e);
                }
                if (r.result.n === 0) {
                    console.log(true);
                    return reject();
                }
                resolve(r);
            });
        });
    }
}
exports.default = UserContoller;
