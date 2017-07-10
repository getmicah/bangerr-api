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
            .post(this.rootPost.bind(this))
            .delete(this.rootDelete.bind(this));
        this.router.route('/:id')
            .get(this.idGet.bind(this));
        this.router.route('/:username')
            .get(this.usernameGet.bind(this));
    }
    rootGet(req, res) {
        this.controller.getAllUsers()
            .then((r) => {
            res.json(r);
        })
            .catch((e) => {
            res.json(e);
        });
    }
    rootPost(req, res) {
        const newUser = {
            username: req.body.username,
            password: req.body.password
        };
        this.controller.addUser(newUser)
            .then((r) => {
            res.json(r);
        })
            .catch((e) => {
            if (!e) {
                res.json({ error: `User: ${req.body.username} already exists` });
            }
            res.json(e);
        });
    }
    rootDelete(req, res) {
        this.controller.deleteUserById(req.body.id)
            .then((r) => {
            res.json(r);
        })
            .catch((e) => {
            if (!e) {
                res.json({ error: `User: ${req.body.id} does not exist` });
            }
            res.json(e);
        });
    }
    idGet(req, res, next) {
        this.controller.getUserById(req.params.id)
            .then((r) => {
            res.json(r);
        })
            .catch((e) => {
            next();
        });
    }
    usernameGet(req, res, next) {
        this.controller.getUserByUsername(req.params.username)
            .then((r) => {
            res.json(r);
        })
            .catch((e) => {
            next();
        });
    }
}
exports.default = UserRouter;
