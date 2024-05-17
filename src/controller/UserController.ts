import express, { Request, Response, Router, NextFunction } from "express";
import AuthMiddleware from "../middleware/AuthMiddleware";
import { UserRequest } from "../model/request/UserRequest";
import { HttpException } from "../exception/HttpException";
import { UserService } from "../service/UserService";
import { container } from "tsyringe";
import { UserServiceImpl } from "../service/impl/UserServiceImpl";
import { FieldCheckMiddleware } from "../middleware/FieldCheck/FieldCheckMiddleware";

const userController: Router = express.Router();

const userService: UserService = container.resolve(UserServiceImpl);

userController.get('/', AuthMiddleware, (req: Request, res: Response, next: NextFunction) => {
  userService.findById(req.params['__user_id__']).then(profile => res.json({...profile})).catch((e) => {
    next(HttpException.NOT_FOUND.message(e));
  });
});

userController.post('/', FieldCheckMiddleware, (req: Request, res: Response, next: NextFunction) => {
  userService.save(req.body as UserRequest).then(userResponse => res.status(200).json({...userResponse})).catch(e => {
    next(HttpException.CONFLICT.message(e));
  });
});

export default userController;