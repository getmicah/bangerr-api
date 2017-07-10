"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../store");
class Route {
    constructor(collection) {
        this.router = express_1.Router();
        this.collection = store_1.default.db.collection(collection);
        this.init();
    }
    getAll() {
        return new Promise((resolve, reject) => {
            this.collection.find({}).toArray((err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }
    getOne(id) {
        return new Promise((resolve, reject) => {
            this.collection.findOne({ id }, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }
    addOne(entry) {
        return new Promise((resolve, reject) => {
            this.collection.insertOne(entry, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }
    deleteOne(id) {
        return new Promise((resolve, reject) => {
            this.collection.deleteOne({ id }, (err, result) => {
                if (result.n === 0) {
                    // doesnt exist
                    reject(result.n);
                }
                resolve(result);
            });
        });
    }
}
exports.default = Route;
