import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exception/HttpException";

const NotFoundMeddleware = (req: Request, res: Response, next: NextFunction) => {
  next(HttpException.NOT_FOUND.message("The requested endpoint is not available. Please check the URL and try again."));
}

export default NotFoundMeddleware;