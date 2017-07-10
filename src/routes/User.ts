import { Router, Request, Response, NextFunction } from 'express';

import Controller from '../controllers/User';

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
			.post()
			.delete();
		this.router.route('/:username')
			.get();
	}

	private rootGet(req: Request, res: Response) {
		this.controller.getAllUsers()
			.then((r) => {
				res.send(r);
			})
			.catch((e) => {

			});
	}
}
