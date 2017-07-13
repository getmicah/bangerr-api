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
			.post(this.rootPost.bind(this))
			.delete(this.rootDelete.bind(this));
		this.router.route('/:id')
			.get(this.idGet.bind(this))
			.put(this.idPut.bind(this))
		this.router.route('/:username')
			.get(this.usernameGet.bind(this))
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
		this.controller.addUser(req.body)
			.then((r) => {
				res.json(r);
			})
			.catch((e) => {
				res.json(e);
			});
	}

	private rootDelete(req: Request, res: Response) {
		if (req.body.confirm === 'true') {
			this.controller.deleteAll()
				.then((r) => {
					res.json(r);
				})
				.catch((e) => {
					res.json(e);
				});
		} else {
			res.json('Requires confirmation')
		}
	}

	private idGet(req: Request, res: Response, next: NextFunction) {
		this.controller.getUserById(req.params.id)
			.then((r) => {
				res.json(r);
			})
			.catch((e) => {
				next();
			});
	}

	private idPut(req: Request, res: Response, next: NextFunction) {
		this.controller.updateUserById(req.params.id, req.body)
			.then((r) => {
				res.json(r);
			})
			.catch((e) => {
				res.json(e);
			});
	}

	private idDelete(req: Request, res: Response) {
		this.controller.deleteUserById(req.params.id)
			.then((r) => {
				res.json(r);
			})
			.catch((e) => {
				res.json(e);
			});
	}

	private usernameGet(req: Request, res: Response, next: NextFunction) {
		this.controller.getUserByUsername(req.params.username)
			.then((r) => {
				res.json(r);
			})
			.catch((e) => {
				next();
			});
	}
}
