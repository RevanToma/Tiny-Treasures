import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes";
import AppError from "./utils/appError";
import { globalErrorHandler } from "./utils/errorHandler";

dotenv.config({ path: `${__dirname}/../config.env` });

export const app = express();

// MIDDLEWARE
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/v1", routes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl}!`, 404));
});

// ERROR HANDLING
app.use(globalErrorHandler);
