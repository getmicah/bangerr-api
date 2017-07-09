export const home = function(app: any) {
	app.route('/')
		.get((req: any, res: any) => {
			res.send({
				message: "Welcome to the api."
			});
		});
}
