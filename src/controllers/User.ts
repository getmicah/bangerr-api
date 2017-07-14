import { Collection, ObjectID, MongoError, InsertWriteOpResult } from 'mongodb';

import store from '../store';
import User from '../models/User';

export default class UserContoller {
	private collection: Collection;

	constructor() {
		this.collection = store.db.collection('users');
	}

	public getAllUsers(): Promise<HttpResponse> {
		return new Promise((resolve, reject) => {
			this.collection.find({}).toArray((dbError, dbRes) => {
				if (dbError) {
					return reject({
						status: 500,
						type: 'Database',
						message: dbError
					});
				}
				resolve({
					status: 200,
					type: 'Success',
					message: dbRes
				});
			});
		});
	}

	private getUser(filter: any): Promise<HttpResponse> {
		return new Promise((resolve, reject) => {
			this.collection.findOne(filter, (dbError, dbRes) => {
				if (dbError) {
					return reject({
						status: 500,
						type: 'Database',
						message: dbError
					});
				}
				if (dbRes === null) {
					return reject({
						status: 400,
						type: 'InvalidQueryParameterValue',
						message: 'User doesn\'t exist.'
					});
				}
				resolve({
					status: 200,
					type: 'Success',
					message: dbRes
				});
			});
		});
	}

	public getUserById(id: string): Promise<HttpResponse>  {
		return new Promise((resolve, reject) => {
			if (id.length !== 24) {
				return reject({
					status: 400,
					type: 'InvalidQueryParameterValue',
					message: 'User doesn\'t exist.'
				});
			}
			this.getUser({_id: new ObjectID(id)})
				.then((r) => resolve(r))
				.catch((r) => reject(r));
		});
	}

	public getUserByUsername(username: string): Promise<HttpResponse>  {
		return new Promise((resolve, reject) => {
			this.getUser({username})
				.then((r) => resolve(r))
				.catch((r) => reject(r));
		});
	}

	private insertUser(user: User): Promise<HttpResponse> {
		return new Promise((resolve, reject) => {
			this.getUserByUsername(user.props.username)
				.then((r) => {
					return reject({
						status: 400,
						type: 'InvalidQueryParameterValue',
						message:`User already exists.`
					});
				})
				.catch((r) => {
					if (r.status === 500) {
						return reject(r);
					}
					this.collection.insertOne(user.props, (dbError, dbRes) => {
						if (dbError) {
							return reject({
								status: 500,
								type: 'Database',
								message: dbError
							});
						}
						resolve({
							status: 200,
							type: 'Success',
							message: dbRes
						});
					});
				});
		});
	}

	public addUser(props: any): Promise<HttpResponse> {
		return new Promise((resolve, reject) => {
			const required = ['username', 'password'];
			const user = new User(props, required);
			user.validate()
				.then(user.hasRequiredProperties.bind(user))
				.then(() => {
					this.insertUser(user)
						.then((r) => resolve(r))
						.catch((e) => reject(e));
				})
				.catch((message) => reject({
					status: 400,
					type: 'InvalidInput',
					message
				}));
		});
	}

	private updateUser(filter: any, props: any): Promise<HttpResponse> {
		return new Promise((resolve, reject) => {
			if (Object.keys(props).length === 0) {
				return reject({
					status: 400,
					type: 'InvalidInput',
					content: 'No properties to update'
				});
			}
			const user = new User(props);
			user.validate()
				.then(() => {
					this.collection.updateOne(filter, {$set: props}, (dbError, dbRes) => {
						if (dbError) {
							return reject({
								status: 500,
								type: 'Database',
								message: dbError
							});
						}
						resolve({
							status: 200,
							type: 'Success',
							message: dbRes
						});
					});
				})
				.catch((message) => reject({
					status: 400,
					type: 'InvalidInput',
					message
				}));
		});
	}

	public updateUserById(id: string, props: any): Promise<HttpResponse> {
		return new Promise((resolve, reject) => {
			this.getUserById(id).then(() => {
				this.updateUser({
					_id: new ObjectID(id)
				}, props)
					.then((r) => resolve(r))
					.catch((e) => reject(e));
			}).catch((e) => reject(e));
		});
	}

	public updateUserByUsername(username: string, props: string): Promise<HttpResponse> {
		return new Promise((resolve, reject) => {
			this.getUserByUsername(username).then(() => {
				this.updateUser({username}, props)
					.then((r) => resolve(r))
					.catch((r) => reject(r));
			}).catch((e) => reject(e));
		});
	}

	private deleteUser(filter: any): Promise<HttpResponse> {
		return new Promise((resolve, reject) => {
			this.collection.deleteOne(filter, (dbError, dbRes: any) => {
				if (dbError) {
					return reject({
						status: 500,
						type: 'Database',
						message: dbError
					});
				}
				if (dbRes.result.n === 0) {
					return reject({
						status: 400,
						type: 'InvalidQueryParameterValue',
						message: 'User doesn\'t exist.'
					});
				}
				resolve({
					status: 200,
					type: 'Success',
					message: dbRes
				});
			});
		});
	}

	public deleteUserById(id: string): Promise<HttpResponse> {
		return new Promise((resolve, reject) => {
			this.getUserById(id).then(() => {
				this.deleteUser({
					_id: new ObjectID(id)
				})
					.then((r) => resolve(r))
					.catch((r) => reject(r));
			}).catch((r) => reject(r));
		});
	}

	public deleteUserByUsername(username: string): Promise<HttpResponse> {
		return new Promise((resolve, reject) => {
			this.getUserById(username).then(() => {
				this.deleteUser({username})
					.then((r) => resolve(r))
					.catch((r) => reject(r));
			}).catch((r) => reject(r));
		});
	}

	public deleteAll(confirm: string): Promise<HttpResponse> {
		return new Promise((resolve, reject) => {
			if (confirm !== 'true') {
				return reject({
					status: 400,
					type: 'InvalidInput',
					message: 'Requires confirmation.'
				})
			}
			this.collection.deleteMany({}, (dbError, dbRes: any) => {
				if (dbError) {
					return reject({
						status: 500,
						type: 'Database',
						message: dbError
					});
				}
				resolve({
					status: 200,
					type: 'Success',
					message: dbRes
				});
			});
		});
	}
}
