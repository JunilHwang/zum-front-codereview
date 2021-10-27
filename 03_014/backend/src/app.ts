import express, { ErrorRequestHandler, NextFunction, Application, Request, Response } from "express";
import cors from "cors";

import { ServerError, httpStatus, PORT } from "./utils";
import apiRouter from "./routes";
import path from "path";

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = httpStatus;

const app: Application = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../front_build_files")));
}

app.set("port", PORT);

app.use(cors());
app.use("/api", apiRouter);

const notFoundError = (req: Request, res: Response, next: NextFunction) => {
  const err = new Error("Not Found") as ServerError;
  err.status = NOT_FOUND;
  next(err);
};
app.use(notFoundError);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || INTERNAL_SERVER_ERROR);
  return res.json({ statusCode: res.statusCode, message: err.message, data: null });
};
app.use(errorHandler);

app.listen(app.get("port"), () => console.log(`http://localhost:${app.get("port")}/`));
