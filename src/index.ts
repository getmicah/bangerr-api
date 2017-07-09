import * as express from 'express';
import * as bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

class Server {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.database();
		this.middleware();
		this.routes();
	}

	private database(): void {
		const url = 'mongodb://localhost:42069/myapp';
		MongoClient.connect(url, (err, db) => {
			console.log('Connected correctly to database');
			db.close();
		});
	}

	private middleware(): void {
		this.app.use(bodyParser.urlencoded({
			extended: true
		}));
		this.app.use(bodyParser.json());
		this.app.use((req, res, next) => {
			console.log('*');
			next();
		});
	}

	private routes(): void {
		let router = express.Router();
	    router.get('/', (req, res, next) => {
			res.json({
				message: 'Hello World!'
			});
	    });
	    this.app.use('/', router);
	}
}

export default new Server().app.listen('3000');
