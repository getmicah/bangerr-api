"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const store_1 = require("./store");
const config_1 = require("./config");
const Home_1 = require("./routes/Home");
const User_1 = require("./routes/User");
class Server {
    constructor() {
        this.app = express();
        store_1.default.init()
            .then(() => {
            this.middleware();
            this.routes();
        })
            .catch();
    }
    middleware() {
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json());
    }
    routes() {
        this.app.use('/', new Home_1.default().router);
        this.app.use('/users', new User_1.default().router);
    }
}
exports.default = new Server().app.listen(config_1.default.server.port);
