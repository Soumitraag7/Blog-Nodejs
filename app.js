require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const chalk = require('chalk');

// mongoose.set('useFindAndModify', false);

const setRouter = require('./routes/routers');
const setMiddleware = require('./middlewares/middleweres');

//databaseURl
// const databaseURl = `mongodb+srv://LMHasib:LMShsb@cluster0.db2ry.mongodb.net/blog`;
const databaseURl = process.env.DB_URL;
//  const databaseURl = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.wcaoc.mongodb.net/curd?retryWrites=true&w=majority`;

app.set('view engine', 'ejs');
app.set('views', 'views');

setMiddleware(app);
setRouter(app);
app.use((req, res, next) => {
	let error = new Error('404 page not found');
	error.status = 404;
	next(error);
});
app.use((err, req, res, next) => {
	if (err.status === 404) {
		return res.render('pages/error/404', {
			title: 'Page not found',
			flashMessage: {}
		});
	}
	console.log(err);
	res.render('pages/error/500', { title: 'Page not found', flashMessage: {} });
});

const PORT = process.env.PORT || 5000;
mongoose
	.connect(databaseURl, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log(chalk.blue('Server is connect with DB'));
		app.listen(PORT, () => {
			console.log(chalk.green(`Server is running on http://localhost:${PORT}`));
		});
	})
	.catch(err => {
		console.log(err);
	});
