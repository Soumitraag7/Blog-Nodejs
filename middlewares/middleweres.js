const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const { bindWithRequest } = require('../middlewares/authMiddleware');
const setLocals = require('../middlewares/setLocals');

const databaseURl = `mongodb+srv://LMHasib:LMShsb@cluster0.db2ry.mongodb.net/blog`;

const store = new MongoDBStore({
	uri: databaseURl,
	collection: 'mySessions'
});
const middleware = [
	morgan('dev'),
	express.static('public'),
	express.urlencoded({
		extended: true
	}),
	express.json(),
	session({
		secret: process.env.SECRET_KEY || 'SECRET_KEY',
		resave: false,
		saveUninitialized: false,
		store: store
	}),
	bindWithRequest(),
	setLocals(),
	flash()
];

module.exports = app => {
	middleware.forEach(m => {
		app.use(m);
	});
};
