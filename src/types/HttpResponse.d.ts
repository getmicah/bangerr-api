interface HttpResponse {
    status: 200 | 400 | 500;
	type: 'Success' | 'InvalidQueryParameterValue' | 'InvalidInput' | 'Database';
	message: any;
}
