"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const store_1 = require("./store");
const config_1 = require("./config");
const Root_1 = require("./routes/Root");
const User_1 = require("./routes/User");
class Server {
    constructor() {
        this.app = express();
        this.router = express.Router();
        store_1.default.init()
            .then(() => {
            this.middleware();
            this.routes();
        })
            .catch();
    }
    middleware() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }
    routes() {
        this.router.use('/', new Root_1.default().router);
        this.router.use('/users', new User_1.default().router);
        this.app.use(config_1.default.server.base, this.router);
    }
}
exports.default = new Server().app.listen(config_1.default.server.port);
