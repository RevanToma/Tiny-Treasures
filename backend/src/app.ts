import express from "express";
import passport from "passport";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { postsRouter } from "./routes/posts.router";
import { userRouter } from "./routes/user.router";
import webRouter from "./routes/web.router";
import AppError from "./utils/appError";
import { globalErrorHandler } from "./utils/errorHandler";
import { passportConfig } from "./utils/passportConfig";
import { chatRouter } from "./routes/chat.router";
import { messageRouter } from "./routes/message.router";
// CONFIG
dotenv.config({ path: `${__dirname}/../config.env` });
// passportConfig(passport);

export const app = express();

// MIDDLEWARE
app.use(passport.initialize());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// ROUTES
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/users", userRouter);
app.use("/", webRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl}!`, 404));
});

// ERROR HANDLING
app.use(globalErrorHandler);
