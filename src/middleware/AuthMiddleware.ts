import { Request, Response, NextFunction } from "express";
import User from "../model/User";
import { HttpException } from "../exception/HttpException";
import { AuthenticationService } from "../service/AuthenticationService";
import { container } from "tsyringe";

const authenticationService: AuthenticationService = container.resolve(AuthenticationService);

const AuthMiddleware = async (req: Request, _: Response, next: NextFunction) => {
  let authHeader = req.headers.authorization;
  let token = authHeader?.replace("Bearer ", "").trim();
  try {
    if(token !== undefined){
      let user: User = await authenticationService.validate(token);
      if (user.id != null) {
        req.params['__user_id__'] = user.id;
      }
      req.params['__user_name__'] = user.fullname;
      next();
    }else{
      next(HttpException.UNAUTHORIZED.message("The 'Bearer' token was not passed in the request header."));
    }
  } catch (error) {
    next(HttpException.UNAUTHORIZED.message("The JWT token provided is not valid."));
  }
}

export default AuthMiddleware;