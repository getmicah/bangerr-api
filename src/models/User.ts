import ObjectModel from './ObjectModel';

const userSchema: JsonSchema = {
	id: 'user',
	properties: {
		username: {
			type: 'string'
		},
		password: {
			type: 'string'
		},
		admin: {
			type: 'boolean'
		}
	},
	additionalProperties: false
}

export default class User extends ObjectModel {
	constructor(props: any, required?: Array<string>) {
		super(props, userSchema, required);
	}
}
