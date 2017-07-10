import { Router, Request, Response, NextFunction } from 'express';

import Controller from '../controllers/User';
import UserModel from '../models/User';

export default class UserRouter {
	public router: Router;
	private controller: Controller;

	constructor() {
		this.router = Router();
		this.controller = new Controller();
		this.init();
	}

	private init() {
		this.router.route('/')
			.get(this.rootGet.bind(this))
		this.router.route('/id/')
			.get(this.userGet.bind(this))
			.post(this.rootPost.bind(this))
			.delete(this.rootDelete.bind(this));
	}

	private rootGet(req: Request, res: Response) {
		this.controller.getAllUsers()
			.then((r) => {
				res.json(r);
			})
			.catch((e) => {
				res.json(e);
			});
	}

	private rootPost(req: Request, res: Response) {
		const newUser: UserModel = {
			username: req.body.username,
			password: req.body.password
		}
		this.controller.addUser(newUser)
			.then((r) => {
				res.json(r);
			})
			.catch((e) => {
				res.json(e);
			});
	}

	private rootDelete(req: Request, res: Response) {
		this.controller.deleteUserById(req.body.id)
			.then((r) => {
				res.json(r);
			})
			.catch((e) => {
				if (!e) {
					res.json({error:`User: ${req.body.id} does not exist`});
				}
				res.json(e);
			});
	}

	private userGet(req: Request, res: Response) {
		this.controller.getUserById(req.body.id)
			.then((r) => {
				res.json(r);
			})
			.catch((e) => {
				res.json(e);
			});
	}
}
