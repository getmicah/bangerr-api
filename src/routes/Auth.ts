import { Router, Request, Response, NextFunction } from 'express';

import Controller from '../controllers/Auth';
import HttpResponse from '../models/HttpResponse';

export default class AuthRouter {
	public router: Router;
	private controller: Controller;

	constructor() {
		this.router = Router();
		this.controller = new Controller();
		this.init();
	}

	public init() {
		this.router.route('/login')
			.get((res: Response) => {
				res.json({
					message: 'ya bish'
				})
			})
			.post(this.loginPost.bind(this));
	}

	private loginPost(req: Request, res: Response, next: NextFunction) {
		this.controller.getUserToken(req.body.username, req.body.password)
			.then((r: HttpResponse) => {
				res.status(r.status).json(r);
			})
			.catch((r: HttpResponse) => {
				res.status(r.status).json(r);
			});
	}
}
