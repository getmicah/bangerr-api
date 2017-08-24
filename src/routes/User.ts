import { Router, Request, Response, NextFunction } from 'express';

import store from '../store';
import Controller from '../controllers/User';
import HttpResponse from '../models/HttpResponse';

export default class UserRouter {
	public router: Router;
	private controller: Controller;

	constructor() {
		this.router = Router();
		this.controller = new Controller();
		this.routes();
	}

	private routes() {
		this.router.route('/')
			.get(this.rootGet.bind(this))
			.post(this.rootPost.bind(this))
			.delete(this.rootDelete.bind(this))
		this.router.route('/:id')
			.get(this.idGet.bind(this))
			.put(this.idPut.bind(this))
			.delete(this.idDelete.bind(this))
		this.router.route('/:username')
			.get(this.usernameGet.bind(this))
			.put(this.usernamePut.bind(this))
			.delete(this.usernameDelete.bind(this))
	}

	private respond(res: Response, r: HttpResponse) {
		res.status(r.status).json(r);
	}

	private rootGet(req: Request, res: Response) {
		this.controller.getAllUsers()
			.then((r: HttpResponse) => this.respond(res, r))
			.catch((r: HttpResponse) => this.respond(res, r));
	}

	private rootPost(req: Request, res: Response) {
		this.controller.addUser(req.body)
			.then((r: HttpResponse) => this.respond(res, r))
			.catch((r: HttpResponse) => this.respond(res, r));
	}

	private rootDelete(req: Request, res: Response) {
		this.controller.deleteAll(req.body.confirm)
			.then((r: HttpResponse) => this.respond(res, r))
			.catch((r: HttpResponse) => this.respond(res, r));
	}

	private idGet(req: Request, res: Response, next: NextFunction) {
		this.controller.getUserById(req.params.id)
			.then((r: HttpResponse) => this.respond(res, r))
			.catch((r: HttpResponse) => {
				if (r.status === 400) {
					return next();
				}
				this.respond(res, r);
			});
	}

	private idPut(req: Request, res: Response, next: NextFunction) {
		this.controller.updateUserById(req.params.id, req.body)
			.then((r: HttpResponse) => this.respond(res, r))
			.catch((r: HttpResponse) => {
				if (r.status === 400) {
					return next();
				}
				this.respond(res, r);
			});
	}

	private idDelete(req: Request, res: Response, next: NextFunction) {
		this.controller.deleteUserById(req.params.id)
			.then((r: HttpResponse) => this.respond(res, r))
			.catch((r: HttpResponse) => {
				if (r.status === 400) {
					return next();
				}
				this.respond(res, r);
			});
	}

	private usernameGet(req: Request, res: Response, next: NextFunction) {
		this.controller.getUserByUsername(req.params.username)
			.then((r: HttpResponse) => this.respond(res, r))
			.catch((r: HttpResponse) => this.respond(res, r));
	}

	private usernamePut(req: Request, res: Response, next: NextFunction) {
		this.controller.updateUserByUsername(req.params.username, req.body)
			.then((r: HttpResponse) => this.respond(res, r))
			.catch((r: HttpResponse) => this.respond(res, r));
	}

	private usernameDelete(req: Request, res: Response, next: NextFunction) {
		this.controller.deleteUserByUsername(req.params.username)
			.then((r: HttpResponse) => this.respond(res, r))
			.catch((r: HttpResponse) => this.respond(res, r));
	}
}
