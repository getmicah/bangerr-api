import { Collection, ObjectID, MongoError, InsertWriteOpResult } from 'mongodb';
import * as jwt from 'jsonwebtoken';

import store from '../store';
import UserContoller from './User';
import HttpResponse from '../models/HttpResponse';

export default class AuthContoller {
	private collection: Collection;
	private userContoller: UserContoller;

	constructor() {
		this.collection = store.db.collection('users');
		this.userContoller = new UserContoller();
	}

	public getUserToken(username: string, password: string): Promise<HttpResponse> {
		return new Promise((resolve, reject) => {
			this.userContoller.getUserByUsername(username)
				.then((r) => {
					if (password != r.message.password) {
						// throw 400 code
					}
				})
				.catch((r) => reject(r));
		});
	}
}
