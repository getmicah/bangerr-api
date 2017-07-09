"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../store");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.users = store_1.default.db.collection('users');
        this.init();
    }
    init() {
        this.router.route('/')
            .get()
            .post()
            .delete();
        this.router.route('/:username')
            .get();
    }
    getAll() {
        return new Promise((resolve, reject) => {
            this.users.find({}).toArray((err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }
    getOne(id) {
        return new Promise((resolve, reject) => {
            this.users.findOne({ id }, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }
    addOne(newUser) {
        return new Promise((resolve, reject) => {
            this.users.insertOne(newUser, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            this.users.deleteOne({ id }, (err, result) => {
                if (result.n === 0) {
                    // doesnt exist
                    reject();
                }
                resolve();
            });
        });
    }
}
exports.default = UserRouter;
