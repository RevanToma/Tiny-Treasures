import { ErrorRequestHandler } from 'express';

const sendErrorDev: ErrorRequestHandler = (err, req, res): void => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd: ErrorRequestHandler = (err, req, res): void => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: 'An error occurred. Please try again!',
    });
  }
};

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV! === 'development') {
    sendErrorDev(err, req, res, next);
    return;
  }
  if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, req, res, next);
    return;
  }
};
