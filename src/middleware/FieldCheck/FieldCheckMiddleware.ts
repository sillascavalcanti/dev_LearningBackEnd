import { NextFunction, Request, Response } from "express";
import { validations } from "./FieldValidation";
import { HttpException } from "../../exception/HttpException";

export const FieldCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let { valid, errorMessage } = Object.keys(req.body).reduce((acc: { valid: boolean, errorMessage: { [field: string]: string[] } }, field) => {
    let validators = validations[field] || [];
    validators.forEach(v => {
      let result = v.validateFunction(req.body[field]);
      acc.valid = acc.valid && result;
      if (!result) {
        if(acc.errorMessage[field] === undefined)acc.errorMessage[field] = [];
        acc.errorMessage[field].push(v.message);
      }
    });
    return acc;
  }, { valid: true, errorMessage: {} });

  if (valid) {
    next();
  } else {
    next(HttpException.BAD_REQUEST.message(errorMessage));
  }
}