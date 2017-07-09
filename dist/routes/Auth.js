"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class AuthRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.post('/register', this.register.bind(this));
    }
    register(req, res, next) {
    }
    login(req, res, next) {
    }
}
exports.AuthRouter = AuthRouter;
exports.default = new AuthRouter().router;
