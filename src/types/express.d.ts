import { Db } from 'mongodb';

declare module 'express' {
	export interface Request {
		config?: any,
		db?: Db
	}
}
