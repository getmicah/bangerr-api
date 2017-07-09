"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class HomeRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/', this.welcomeMessage.bind(this));
    }
    welcomeMessage(req, res, next) {
        res.send(req.config);
    }
}
exports.HomeRouter = HomeRouter;
const homeRoutes = new HomeRouter();
homeRoutes.init();
exports.default = homeRoutes.router;
