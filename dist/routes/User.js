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
            .get(this.idGet.bind(this))
            .put(this.idPut.bind(this));
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
        this.controller.addUser(req.body)
            .then((r) => {
            res.json(r);
        })
            .catch((e) => {
            res.json(e);
        });
    }
    rootDelete(req, res) {
        if (req.body.confirm === 'true') {
            this.controller.deleteAll()
                .then((r) => {
                res.json(r);
            })
                .catch((e) => {
                res.json(e);
            });
        }
        else {
            res.json('Requires confirmation');
        }
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
    idPut(req, res, next) {
        this.controller.updateUserById(req.params.id, req.body)
            .then((r) => {
            res.json(r);
        })
            .catch((e) => {
            res.json(e);
        });
    }
    idDelete(req, res) {
        this.controller.deleteUserById(req.params.id)
            .then((r) => {
            res.json(r);
        })
            .catch((e) => {
            res.json(e);
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
