import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors";

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Something went wrong try again later");
};

export default errorHandlerMiddleware;
