"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const store_1 = require("../store");
const User_1 = require("../models/User");
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
    addUser(props) {
        const newUser = new User_1.default(props, ['username', 'password']);
        return new Promise((resolve, reject) => {
            newUser.validate()
                .then(newUser.hasRequiredProperties.bind(newUser))
                .catch(() => {
                reject({ type: 'Validation' });
            })
                .then(() => {
                this.searchUserByUsername(newUser.props.username)
                    .then((r) => {
                    reject({ type: 'User' });
                })
                    .catch((e) => {
                    if (e.type === 'Database') {
                        return reject({
                            type: 'Database',
                            content: e.content
                        });
                    }
                    this.collection.insertOne(newUser.props, (e, r) => {
                        if (e) {
                            return reject({ type: 'Database', content: e });
                        }
                        resolve(r);
                    });
                });
            });
        });
    }
    searchUserByUsername(username) {
        return new Promise((resolve, reject) => {
            this.getUserByUsername(username)
                .then((r) => {
                if (r === null) {
                    console.log('B');
                    return reject({
                        type: 'User',
                        content: `${username} doesn't exist`
                    });
                }
                return resolve(r);
            })
                .catch((e) => reject({ type: 'Database', content: e }));
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
                    return reject();
                }
                resolve(r);
            });
        });
    }
}
exports.default = UserContoller;
