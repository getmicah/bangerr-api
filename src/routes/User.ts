import { Router, Request, Response, NextFunction } from 'express';

export class UserRouter {
	public router: Router

	constructor() {
		this.router = Router();
		this.init();
	}

	public init() {
		this.router.get('/', this.getAll.bind(this));
	}

	public getAll(req: Request, res: Response, next: NextFunction) {
		res.send({
			message: "Welcome to the api."
		});
	}

	public addUser(req: Request, res: Response, next: NextFunction) {

	}
}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;
