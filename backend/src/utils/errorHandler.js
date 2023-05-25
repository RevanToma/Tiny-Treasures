"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const sendErrorDev = (err, req, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorProd = (err, req, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    else {
        res.status(err.statusCode).json({
            status: err.status,
            message: 'An error occurred. Please try again!',
        });
    }
};
// TODO:  Handle specific error messages
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res, next);
        return;
    }
    if (process.env.NODE_ENV === 'production') {
        sendErrorProd(err, req, res, next);
        return;
    }
};
exports.globalErrorHandler = globalErrorHandler;
