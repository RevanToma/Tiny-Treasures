"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const appError_1 = __importDefault(require("./appError"));
// export const catchAsync = (fn: Function): RequestHandler => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     fn(req, res, next).catch(next);
//   };
// };
const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new appError_1.default(message, 400);
};
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            if (err.code === 11000) {
                err = handleDuplicateFieldsDB(err);
                return res.status(400).json({
                    status: "error",
                    message: err.message,
                });
            }
            else {
                // Other error
                return res.status(500).json({
                    status: "error",
                    message: err.message,
                });
            }
        });
    };
};
exports.catchAsync = catchAsync;
