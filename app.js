const createError = require('http-errors');
const express = require('express');
const env  =  require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require("mysql");
const compression = require('compression')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();
const minifyHTML = require('express-minify-html');

/* connect to mysql basic */
const db = mysql.createConnection({
	host: process.env.DB_HOST,
  port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
})
db.connect((err) => {
	if (err) throw err;
	console.log("Database was connected ....");
});
global.db = db;


app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header('Access-Control-Allow-Credentials', true);
   res.removeHeader("X-Powered-By");
   next();
});
// minify
app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}));
// compress
app.use(compression())
// view engine setup
app.set('views', path.join(__dirname, 'resources/views'));
app.use(require('express-edge'));
//app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* ============ routing =========*/
//app.use('/users', usersRouter);
app.use('/', require('./routes/start'));
app.use('/create', require('./routes/create'));
app.use('/delete',require('./routes/delete'));
app.use('/edit',require('./routes/edit'));
app.use('/view/',require('./routes/view'));
//app.use('/update',require('./routes/update'));
//app.use('/status',require('./routes/status'));
app.use('/api',require('./routes/api'));
// beta api version
//app.use('/beta',require('./routes/beta'));
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
require('./schedule')
module.exports = app;