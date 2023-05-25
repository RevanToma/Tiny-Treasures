"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const posts_router_1 = require("./routes/posts.router");
const user_router_1 = require("./routes/user.router");
const web_router_1 = __importDefault(require("./routes/web.router"));
const enum_routes_1 = __importDefault(require("./routes/enum.routes"));
const appError_1 = __importDefault(require("./utils/appError"));
const errorHandler_1 = require("./utils/errorHandler");
const passportConfig_1 = require("./utils/passportConfig");
const chat_router_1 = require("./routes/chat.router");
// CONFIG
dotenv_1.default.config({ path: `${__dirname}/../config.env` });
(0, passportConfig_1.passportConfig)(passport_1.default);
exports.app = (0, express_1.default)();
// MIDDLEWARE
exports.app.use(passport_1.default.initialize());
if (process.env.NODE_ENV === 'development') {
    exports.app.use((0, morgan_1.default)('dev'));
}
exports.app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
}));
exports.app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
exports.app.use(express_1.default.json({ limit: '10kb' }));
exports.app.use((0, cookie_parser_1.default)());
// ROUTES
exports.app.use('/api/v1/posts', posts_router_1.postsRouter);
exports.app.use('/api/v1/users', user_router_1.userRouter);
exports.app.use('/api/v1/enums', enum_routes_1.default);
exports.app.use('/api/v1/chat', chat_router_1.chatRouter);
exports.app.use('/', web_router_1.default);
exports.app.all('*', (req, res, next) => {
    next(new appError_1.default(`Can not find ${req.originalUrl}!`, 404));
});
// ERROR HANDLING
exports.app.use(errorHandler_1.globalErrorHandler);
