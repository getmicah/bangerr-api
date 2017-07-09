import { MongoClient, MongoError, Db } from 'mongodb';

import config from './config';

class Store {
	public db: Db;

	public init(): Promise<void & MongoError> {
		return new Promise((resolve, reject) => {
			MongoClient.connect(config.database.getUrl(), (err, db) => {
				if (err) {
					console.log(err)
					reject(err);
				}
				this.db = db;
				resolve();
			})
		});
	}
}

export default new Store();
