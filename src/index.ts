import * as express from 'express';
import * as bodyParser from 'body-parser';

import store from './store';
import config from './config';

import RootRouter from './routes/Root';
import UserRouter from './routes/User';

class Server {
	public app: express.Application;
	public router: express.Router;

	constructor() {
		this.app = express();
		this.router = express.Router();
		store.init()
			.then(() => {
				this.middleware();
				this.routes();
			})
			.catch((err) => console.log(err));
	}

	private middleware(): void {
		this.app.use(bodyParser.urlencoded({extended: true}));
		this.app.use(bodyParser.json());
	}

	private routes(): void {
		this.router.use('/', new RootRouter().router);
		this.router.use('/users', new UserRouter().router);
		this.app.use(`/v${config.server.version}`, this.router);
	}
}

export default new Server().app.listen(config.server.port);
