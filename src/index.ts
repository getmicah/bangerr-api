import * as express from 'express';
import * as bodyParser from 'body-parser';

import store from './store';
import config from './config';
import HomeRouter from './routes/Home';
import UserRouter from './routes/User';

class Server {
	public app: express.Application;

	constructor() {
		this.app = express();
		store.init()
			.then(() => {
				this.middleware();
				this.routes();
			})
			.catch();
	}

	private middleware(): void {
		this.app.use(bodyParser.urlencoded({
			extended: true
		}));
		this.app.use(bodyParser.json());
	}

	private routes(): void {
		this.app.use('/', new HomeRouter().router);
		this.app.use('/users', new UserRouter().router);
	}
}

export default new Server().app.listen(config.server.port);
