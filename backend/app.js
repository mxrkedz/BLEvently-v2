import express from "express";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";


config({
  path: "./data/config.env",
});

export const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

import user from "./routes/user.js";
import event from "./routes/event.js";
app.use("/api/v1/user", user);
app.use("/api/v1/event", event);

app.use(errorMiddleware);
