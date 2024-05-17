import express, { NextFunction, Request, Response, Router } from "express";
import { HttpException } from "../exception/HttpException";
import { AuthenticationService } from "../service/AuthenticationService";
import { container } from "tsyringe";
import { FieldCheckMiddleware } from "../middleware/FieldCheck/FieldCheckMiddleware";

const authController: Router = express.Router();

const authenticationService: AuthenticationService = container.resolve(AuthenticationService);

authController.post("/login", FieldCheckMiddleware, (req: Request, res: Response, next: NextFunction) => {
  let { email, password } = req.body;
  if (email && password) {
    authenticationService.Auth(email, password).then(token => res.json({ access_token: token })).catch(() => next(HttpException.UNAUTHORIZED.message("The provided email and password do not match.")));
  } else {
    next(HttpException.UNAUTHORIZED.message("Both email and password fields must not be empty or null."));
  }
});

export default authController;
