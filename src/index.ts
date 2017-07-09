import * as express from 'express';
import * as bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();

// Database
var url = 'mongodb://localhost:42069/myapp';
MongoClient.connect(url, (err, db) => {
	console.log("Connected correctly to server");
	db.close();
});

// Middleware
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
	console.log('*');
	next();
});

// Routes
//require('./routes/index')(app);

// Go
app.listen(3000);
