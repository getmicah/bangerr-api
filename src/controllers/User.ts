import { Collection, ObjectID } from 'mongodb';

import store from '../store';
import UserModel from '../models/User';

export default class UserContoller {
	private collection: Collection;

	constructor() {
		this.collection = store.db.collection('users');
	}

	public getAllUsers(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.collection.find({}).toArray((e, r) => {
				if (e) {
					reject(e);
				}
				resolve(r);
			});
		});
	}

	public getUserById(id: string): Promise<any>  {
		return new Promise((resolve, reject) => {
			this.collection.findOne({
				_id: new ObjectID(id)
			}, (e, r) => {
				if (e) {
					reject(e);
				}
				resolve(r);
			});
		});
	}

	public addUser(newUser: UserModel): Promise<any> {
		return new Promise((resolve, reject) => {
			this.collection.insertOne(newUser, (e, r) => {
				if (e) {
					reject(e);
				}
				resolve(r);
			});
		});
	}

	public deleteUserById(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.collection.deleteOne({
				_id: new ObjectID(id)
			}, (e, r: any) => {
				if (e) {
					reject(e);
				}
				if (r.result.n === 0) {
					reject();
				}
				resolve(r);
			});
		});
	}
}
