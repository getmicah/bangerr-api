import { Router, Request, Response, NextFunction } from 'express';
import { Collection, MongoError } from 'mongodb';

import store from '../store';
import UserModel from '../models/User';

export default class UserRouter {
	public router: Router;
	private users: Collection;

	constructor() {
		this.router = Router();
		this.users = store.db.collection('users');
		this.init();
	}

	private init() {
		this.router.route('/')
			.get()
			.post()
			.delete();
		this.router.route('/:username')
			.get()
	}

	private getAll(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.users.find({}).toArray((err, result) => {
				if (err) {
					reject(err);
				}
				resolve(result);
			});
		});
	}

	private getOne(id: string): Promise<any>  {
		return new Promise((resolve, reject) => {
			this.users.findOne({id}, (err, result) => {
				if (err) {
					reject(err);
				}
				resolve(result);
			});
		});
	}

	private addOne(newUser: UserModel): Promise<any> {
		return new Promise((resolve, reject) => {
			this.users.insertOne(newUser, (err, result) => {
				if (err) {
					reject(err);
				}
				resolve(result);
			});
		});
	}

	private deleteOne(id: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.users.deleteOne({id}, (err, result: any) => {
				if (result.n === 0) {
					// doesnt exist
					reject();
				}
				resolve();
			});
		});
	}
}
