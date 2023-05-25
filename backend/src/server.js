"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const mongoose_connection_1 = require("./db/mongoose_connection");
const app_1 = require("./app");
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const socketServer_1 = require("./utils/socketServer");
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(app_1.app);
exports.io = new socket_io_1.Server(server, {
    cors: { origin: "*" },
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongoose_connection_1.connectToMongoDB)().then(() => console.log("Connected to DB..."));
        server.listen(port, () => {
            console.log(`listening to ${port}:  http://127.0.0.1:${port}`);
        });
    }
    catch (error) {
        console.error(error.message);
    }
});
start();
new socketServer_1.SocketServer(exports.io).start();
