"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../store");
const collection = store_1.default.db.collection('users');
console.log(collection);
function getAllUsers() {
    return new Promise((resolve, reject) => {
        collection.find({}).toArray((err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}
exports.getAllUsers = getAllUsers;
function getUserById(id) {
    return new Promise((resolve, reject) => {
        collection.findOne({ id }, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}
exports.getUserById = getUserById;
function addUser(newUser) {
    return new Promise((resolve, reject) => {
        collection.insertOne(newUser, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}
exports.addUser = addUser;
function deleteUserById(id) {
    return new Promise((resolve, reject) => {
        collection.deleteOne({ id }, (err, result) => {
            if (result.n === 0) {
                // doesnt exist
                reject();
            }
            resolve();
        });
    });
}
exports.deleteUserById = deleteUserById;
