"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongodb_1 = require("mongodb");
const config_1 = require("./config");
const Home_1 = require("./routes/Home");
class Server {
    constructor() {
        this.app = express();
        this.database();
        this.middleware();
        this.routes();
    }
    connectDb(db) {
        this.app.use((req, res, next) => {
            console.log('test', db);
            req.db = db;
            next();
        });
    }
    handleDbError(err) {
    }
    database() {
        mongodb_1.MongoClient.connect(`mongodb://${config_1.default.database.url}:${config_1.default.database.port}/${config_1.default.database.name}`)
            .then(this.connectDb.bind(this))
            .catch(this.handleDbError.bind(this));
    }
    middleware() {
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json());
        this.app.use((req, res, next) => {
            req.config = config_1.default;
            next();
        });
    }
    routes() {
        this.app.use('/', Home_1.default);
    }
}
exports.default = new Server().app.listen(config_1.default.server.port);
