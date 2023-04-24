import express from "express";
import { postsRouter } from "./routes/posts.router";

export const routes = express.Router();

routes.use("/posts", postsRouter);
