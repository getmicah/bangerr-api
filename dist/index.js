"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongodb_1 = require("mongodb");
class Server {
    constructor() {
        this.app = express();
        this.database();
        this.middleware();
        this.routes();
    }
    database() {
        const url = 'mongodb://localhost:42069/myapp';
        mongodb_1.MongoClient.connect(url, (err, db) => {
            console.log('Connected correctly to database');
            db.close();
        });
    }
    middleware() {
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json());
        this.app.use((req, res, next) => {
            console.log('*');
            next();
        });
    }
    routes() {
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });
        this.app.use('/', router);
    }
}
exports.default = new Server().app.listen('3000');
