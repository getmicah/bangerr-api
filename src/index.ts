import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import { MongoClient, MongoError, Db } from 'mongodb';

import config from './config';
import HomeRouter from './routes/Home';

class Server {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.database();
		this.middleware();
		this.routes();
	}

	private connectDb(db: Db): void {
		this.app.use((req, res, next) => {
			console.log('test', db);
			(<any>req).db = db;
		    next();
		});
	}

	private handleDbError(err: MongoError): void {

	}

	private database(): void {
		MongoClient.connect(`mongodb://${config.database.url}:${config.database.port}/${config.database.name}`)
			.then(this.connectDb.bind(this))
			.catch(this.handleDbError.bind(this));
	}

	private middleware(): void {
		this.app.use(bodyParser.urlencoded({
			extended: true
		}));
		this.app.use(bodyParser.json());
		this.app.use((req, res, next) => {
			(<any>req).config = config;
		    next();
		});
	}

	private routes(): void {
		this.app.use('/', HomeRouter);
	}
}

export default new Server().app.listen(config.server.port);
