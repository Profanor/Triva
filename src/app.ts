import express from 'express';
import createError from 'http-errors';
import { Response, Request, NextFunction } from 'express';
import path from 'path';
import sequelize from './utils/sequelize';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

const app = express();

  sequelize.sync()
  .then(()=> {
    console.log('connected to the database');
  })
 .catch((error) => {
  console.error('Error connecting to the database:', error);
 });


// view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"..",'public')));

//other middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
import indexRouter from './routes/index';
import profile from './routes/profile';
import admin from './routes/admin';
import userRoutes from './routes/userRoutes';

//use your routes
app.use('/', indexRouter);
app.use('/', profile);
app.use('/', admin);
app.use('/', userRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction ) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;