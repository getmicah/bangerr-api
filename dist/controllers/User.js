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
                if (r === null) {
                    return reject({
                        type: 'User',
                        content: `${id} doesn't exist`
                    });
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
                if (r === null) {
                    return reject({
                        type: 'User',
                        content: `${username} doesn't exist`
                    });
                }
                resolve(r);
            });
        });
    }
    addUser(props) {
        return new Promise((resolve, reject) => {
            const user = new User_1.default(props, ['username', 'password']);
            user.validate()
                .then(user.hasRequiredProperties.bind(user))
                .then(() => {
                this.getUserByUsername(user.props.username)
                    .then((r) => {
                    return reject({ type: 'Database', content: 'User already exists' });
                })
                    .catch((e) => {
                    if (e.type === 'Database') {
                        return reject({ type: 'Database', content: e.content });
                    }
                    this.collection.insertOne(user.props, (e, r) => {
                        if (e) {
                            return reject({ type: 'Database', content: e });
                        }
                        resolve(r);
                    });
                });
            })
                .catch((e) => reject(e));
        });
    }
    updateUserById(id, props) {
        return new Promise((resolve, reject) => {
            if (Object.keys(props).length === 0) {
                return reject({
                    type: 'Validation',
                    content: 'No properties to update'
                });
            }
            const user = new User_1.default(props);
            this.getUserById(id)
                .then(user.validate.bind(user))
                .then(() => {
                this.collection.updateOne({
                    _id: new mongodb_1.ObjectID(id)
                }, { $set: props }, (e, r) => {
                    if (e) {
                        return reject(e);
                    }
                    resolve(r);
                });
            })
                .catch((e) => reject(e));
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
    deleteAll() {
        return new Promise((resolve, reject) => {
            this.collection.deleteMany({}, (e, r) => {
                if (e) {
                    return reject(e);
                }
                resolve(r);
            });
        });
    }
}
exports.default = UserContoller;
