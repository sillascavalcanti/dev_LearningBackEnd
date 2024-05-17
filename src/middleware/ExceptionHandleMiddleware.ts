import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exception/HttpException";
import * as log4js from "log4js";


const ExceptionHandleMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  
  var logger = log4js.getLogger(`[Exception] [${req.ip}]`);
  logger.level = "debug";
  logger.warn(err._message);

  res.status(err.status).send(err);
}

export default ExceptionHandleMiddleware;