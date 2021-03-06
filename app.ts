import createError, { HttpError } from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
require('dotenv/config');

import indexRouter from './routes/index';

const app = express();

// view engine setup

app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs');

app.use(logger("dev"));

app.use(
  cors({
    origin: [
      'https://customer-care10.herokuapp.com/',
      'http://localhost:5001/',
    ],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});


const PORT = process.env.NODE_ENV == "test" ? 5002 : process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});

export default app;
