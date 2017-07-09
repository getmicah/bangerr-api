import { Router, Request, Response, NextFunction } from 'express';

export class HomeRouter {
	public router: Router

	constructor() {
		this.router = Router();
		this.init();
	}

	public init() {
		this.router.get('/', this.welcomeMessage.bind(this));
	}

	public welcomeMessage(req: Request, res: Response, next: NextFunction) {
		res.send(req.config);
	}
}

const homeRoutes = new HomeRouter();
homeRoutes.init();

export default homeRoutes.router;
