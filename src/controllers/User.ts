import { Collection, ObjectID } from 'mongodb';

import store from '../store';
import User from '../models/User';

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
				if (r === null) {
					return reject({
						type:'User',
						content:`${id} doesn't exist`
					});
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
				if (r === null) {
					return reject({
						type:'User',
						content:`${username} doesn't exist`
					});
				}
				resolve(r);
			});
		});
	}

	public addUser(props: any): Promise<any> {
		return new Promise((resolve, reject) => {
			const user = new User(props, ['username', 'password']);
			user.validate()
				.then(user.hasRequiredProperties.bind(user))
				.then(() => {
					this.getUserByUsername(user.props.username)
						.then((r) => {
							return reject({type:'Database',content:'User already exists'});
						})
						.catch((e) => {
							if (e.type === 'Database') {
								return reject({type:'Database',content:e.content});
							}
							this.collection.insertOne(user.props, (e, r) => {
								if (e) {
									return reject({type:'Database', content:e});
								}
								resolve(r);
							});
						});
				})
				.catch((e) => reject(e));
		});
	}

	updateUserById(id: string, props: string): Promise<any> {
		return new Promise((resolve, reject) => {
			if (Object.keys(props).length === 0) {
				return reject({
					type: 'Validation',
					content: 'No properties to update'
				});
			}
			const user = new User(props);
			this.getUserById(id)
				.then(user.validate.bind(user))
				.then(() => {
					this.collection.updateOne({
						_id: new ObjectID(id)
					}, {$set: props}, (e, r) => {
						if (e) {
							return reject(e);
						}
						resolve(r);
					});
				})
				.catch((e) => reject(e));
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
					return reject();
				}
				resolve(r);
			});
		});
	}

	public deleteAll(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.collection.deleteMany({}, (e, r: any) => {
				if (e) {
					return reject(e);
				}
				resolve(r);
			});
		});
	}
}
