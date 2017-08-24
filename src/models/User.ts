import ObjectModel from './ObjectModel';
import { utc } from 'moment';

const userSchema: JsonSchema = {
	id: 'user',
	properties: {
		username: {
			type: 'string',
			minimum: 1
		},
		password: {
			type: 'string',
			minimum: 5
		},
		created_at: {
			type: 'string'
		}
	},
	additionalProperties: false
}

export default class User extends ObjectModel {
	constructor(props: any, required?: Array<string>) {
		super(props, userSchema, required);
		this.props.created_at = utc(new Date()).toISOString();
	}
}
