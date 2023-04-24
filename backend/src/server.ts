import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes";
import { connectToMongoDB } from "./db/mongoose_connection";

dotenv.config({ path: `${__dirname}/../config.env` });

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
const port = process.env.PORT || 3000;

app.use("/api/v1", routes);

const start = async () => {
  try {
    await connectToMongoDB();
    app.listen(port, () => {
      console.log(`listening to ${port}`);
    });
  } catch (error: any) {
    console.error(error.message);
  }
};

start();
