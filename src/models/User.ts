import Model from '../models';

const userSchema: JsonSchema = {
	id: 'user',
	properties: {
		username: {
			type: 'string'
		},
		password: {
			type: 'string'
		}
	},
	additionalProperties: false
}

export default class User extends Model {
	constructor(props: any, required?: Array<string>) {
		super(props, userSchema, required);
	}
}
