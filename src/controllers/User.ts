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
					return reject(e);
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
					return reject(e);
				}
				resolve(r);
			});
		});
	}

	public getUserByUsername(username: string): Promise<any>  {
		return new Promise((resolve, reject) => {
			this.collection.findOne({username}, (e, r) => {
				if (e) {
					return reject(e);
				}
				resolve(r);
			});
		});
	}

	public addUser(newUser: UserModel): Promise<any> {
		return new Promise((resolve, reject) => {
			this.getUserByUsername(newUser.username)
				.then((r) => {
					// dont create duplicate users
					if (r !== null) {
						return reject();
					}
					this.collection.insertOne(newUser, (e, r) => {
						if (e) {
							return reject(e);
						}
						resolve(r);
					});
				})
				.catch((e) => {
					reject(e);
				});
		});
	}

	public deleteUserById(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.collection.deleteOne({
				_id: new ObjectID(id)
			}, (e, r: any) => {
				if (e) {
					return reject(e);
				}
				if (r.result.n === 0) {
					console.log(true)
					return reject();
				}
				resolve(r);
			});
		});
	}
}
