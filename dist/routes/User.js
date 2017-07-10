"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../controllers/User");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.controller = new User_1.default();
        this.init();
    }
    init() {
        this.router.route('/')
            .get(this.rootGet.bind(this))
            .post()
            .delete();
        this.router.route('/:username')
            .get();
    }
    rootGet(req, res) {
        this.controller.getAllUsers()
            .then((r) => {
            res.send(r);
        })
            .catch((e) => {
        });
    }
}
exports.default = UserRouter;
