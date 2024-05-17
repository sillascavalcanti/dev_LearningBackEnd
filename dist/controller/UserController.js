"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthMiddleware_1 = __importDefault(require("../middleware/AuthMiddleware"));
const HttpException_1 = require("../exception/HttpException");
const tsyringe_1 = require("tsyringe");
const UserServiceImpl_1 = require("../service/impl/UserServiceImpl");
const FieldCheckMiddleware_1 = require("../middleware/FieldCheck/FieldCheckMiddleware");
const userController = express_1.default.Router();
const userService = tsyringe_1.container.resolve(UserServiceImpl_1.UserServiceImpl);
userController.get('/', AuthMiddleware_1.default, (req, res, next) => {
    userService.findById(req.params['__user_id__']).then(profile => res.json(Object.assign({}, profile))).catch((e) => {
        next(HttpException_1.HttpException.NOT_FOUND.message(e));
    });
});
userController.post('/', FieldCheckMiddleware_1.FieldCheckMiddleware, (req, res, next) => {
    userService.save(req.body).then(userResponse => res.status(200).json(Object.assign({}, userResponse))).catch(e => {
        next(HttpException_1.HttpException.CONFLICT.message(e));
    });
});
exports.default = userController;
//# sourceMappingURL=UserController.js.map