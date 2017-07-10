import { Router, Request, Response, NextFunction } from 'express';

export default class RootRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public init() {
		this.router.get('/', this.welcomeMessage.bind(this));
	}

	private welcomeMessage(req: Request, res: Response, next: NextFunction) {
		res.json({
			message: 'welcome to api'
		});
	}
}
