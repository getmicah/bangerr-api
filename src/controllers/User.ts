import { Collection } from 'mongodb';

import store from '../store';
import UserModel from '../models/User';

export default class UserContoller {
	private collection: Collection;

	constructor() {
		this.collection = store.db.collection('users');
	}

	public getAllUsers(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.collection.find({}).toArray((err, doc) => {
				if (err) {
					reject(err);
				}
				resolve(doc);
			});
		});
	}

	public getUserById(id: string): Promise<any>  {
		return new Promise((resolve, reject) => {
			this.collection.findOne({id}, (err, doc) => {
				if (err) {
					reject(err);
				}
				resolve(doc);
			});
		});
	}

	public addUser(newUser: UserModel): Promise<any> {
		return new Promise((resolve, reject) => {
			this.collection.insertOne(newUser, (err, doc) => {
				if (err) {
					reject(err);
				}
				resolve(doc);
			});
		});
	}

	public deleteUserById(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.collection.deleteOne({id}, (err, doc: any) => {
				if (doc.n === 0) {
					// doesnt exist
					reject();
				}
				resolve();
			});
		});
	}
}
