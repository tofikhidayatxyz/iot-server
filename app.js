var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require("mysql");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
/* connect to mysql basic */
const db = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
})
db.connect((err) => {
	if (err) throw err;
	console.log("Database was connected ....");
});
global.db = db;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/* ============ routing =========*/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/start', require('./routes/start'));
app.use('/create', require('./routes/create'));
app.use('/delete',require('./routes/delete'));
app.use('/edit',require('./routes/edit'));
app.use('/view',require('./routes/view'));
app.use('/update',require('./routes/update'));
app.use('/status',require('./routes/status'));
/* ========= save */
/* ============ end routing ==================*/
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});
console.log("Sever Running on = " + process.env.HOST + ":" + process.env.PORT);
module.exports = app;