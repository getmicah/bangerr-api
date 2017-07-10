import { MongoClient, MongoError, Db } from 'mongodb';

import config from './config';

class Store {
	public db: Db;

	public init(): Promise<void & MongoError> {
		return new Promise((resolve, reject) => {
			MongoClient.connect(config.database.getUrl())
				.then((db) => {
					this.db = db;
					resolve();
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}

export default new Store();
