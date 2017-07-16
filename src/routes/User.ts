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

	private rootGet(req: Request, res: Response) {
		this.controller.getAllUsers()
			.then((r: HttpResponse) => {
				res.status(r.status).json(r);
			})
			.catch((r: HttpResponse) => {
				res.status(r.status).json(r);
			});
	}

	private rootPost(req: Request, res: Response) {
		this.controller.addUser(req.body)
			.then((r: HttpResponse) => {
				res.status(r.status).json(r);
			})
			.catch((r: HttpResponse) => {
				res.status(r.status).json(r);
			});
	}

	private rootDelete(req: Request, res: Response) {
		this.controller.deleteAll(req.body.confirm)
			.then((r: HttpResponse) => {
				res.status(r.status).json(r);
			})
			.catch((r: HttpResponse) => {
				res.status(r.status).json(r);
			});
	}

	private idGet(req: Request, res: Response, next: NextFunction) {
		this.controller.getUserById(req.params.id)
			.then((r: HttpResponse) => {
				res.status(r.status).json(r)
			})
			.catch((r: HttpResponse) => {
				if (r.status === 400) {
					return next();
				}
				res.status(r.status).json(r);
			});
	}

	private idPut(req: Request, res: Response, next: NextFunction) {
		this.controller.updateUserById(req.params.id, req.body)
			.then((r: HttpResponse) => {
				res.status(r.status).json(r);
			})
			.catch((r: HttpResponse) => {
				if (r.status === 400) {
					return next();
				}
				res.status(r.status).json(r);
			});
	}

	private idDelete(req: Request, res: Response, next: NextFunction) {
		this.controller.deleteUserById(req.params.id)
			.then((r: HttpResponse) => {
				res.status(r.status).json(r);
			})
			.catch((r: HttpResponse) => {
				if (r.status === 400) {
					return next();
				}
				res.status(r.status).json(r);
			});
	}

	private usernameGet(req: Request, res: Response, next: NextFunction) {
		this.controller.getUserByUsername(req.params.username)
			.then((r: HttpResponse) => {
				res.status(r.status).json(r);
			})
			.catch((r: HttpResponse) => {
				res.status(r.status).json(r);
			});
	}

	private usernamePut(req: Request, res: Response, next: NextFunction) {
		this.controller.updateUserByUsername(req.params.username, req.body)
			.then((r: HttpResponse) => {
				res.status(r.status).json(r);
			})
			.catch((r: HttpResponse) => {
				res.status(r.status).json(r);
			});
	}

	private usernameDelete(req: Request, res: Response, next: NextFunction) {
		this.controller.deleteUserByUsername(req.params.username)
			.then((r: HttpResponse) => {
				res.status(r.status).json(r);
			})
			.catch((r: HttpResponse) => {
				res.status(r.status).json(r);
			});
	}
}
