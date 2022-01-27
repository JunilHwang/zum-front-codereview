import express, { ErrorRequestHandler, NextFunction, Application, Request, Response } from "express";
import path from "path";
import { httpStatus, PORT } from "./utils";
import { ServerError } from "./core";
import apiRouter from "./routes";
import { ResponseDataType } from "@common/types";

const app: Application = express();

app.use(express.static(path.join(__dirname, "../front_build")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("port", PORT);
app.use("/api", apiRouter);

const notFoundError = (req: Request, res: Response, next: NextFunction) => {
  const err = new ServerError("Not Found", httpStatus.NOT_FOUND);
  next(err);
};
app.use(notFoundError);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { message, status } = err;
  res.status(status || httpStatus.INTERNAL_SERVER_ERROR);
  const resData: ResponseDataType = { statusCode: status, message, data: null };
  return res.json(resData);
};
app.use(errorHandler);

app.listen(app.get("port"), () => console.log(`http://localhost:${app.get("port")}/`));

