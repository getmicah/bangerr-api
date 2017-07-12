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

	public addUser(props: any): Promise<any> {
		const newUser = new User(props, ['username', 'password']);
		return new Promise((resolve, reject) => {
			newUser.validate()
				.then(newUser.hasRequiredProperties.bind(newUser))
				.catch(() => {
					reject({type:'Validation'});
				})
				.then(() => {
					this.searchUserByUsername(newUser.props.username)
						.then((r) => {
							reject({type:'User'});
						})
						.catch((e) => {
							if (e.type === 'Database') {
								return reject({
									type:'Database',
									content: e.content
								});
							}
							this.collection.insertOne(newUser.props, (e, r) => {
								if (e) {
									return reject({type:'Database', content:e});
								}
								resolve(r);
							});
						});
				});
		});
	}

	public searchUserByUsername(username: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.getUserByUsername(username)
				.then((r) => {
					if (r === null) {
						console.log('B')
						return reject({
							type:'User',
							content:`${username} doesn't exist`
						});
					}
					return resolve(r);
				})
				.catch((e) => reject({type:'Database', content:e}));
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
}
