"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongodb_1 = require("mongodb");
const app = express();
// Database
var url = 'mongodb://localhost:42069/myapp';
mongodb_1.MongoClient.connect(url, (err, db) => {
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
