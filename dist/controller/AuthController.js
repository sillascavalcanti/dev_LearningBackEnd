"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HttpException_1 = require("../exception/HttpException");
const AuthenticationService_1 = require("../service/AuthenticationService");
const tsyringe_1 = require("tsyringe");
const FieldCheckMiddleware_1 = require("../middleware/FieldCheck/FieldCheckMiddleware");
const authController = express_1.default.Router();
const authenticationService = tsyringe_1.container.resolve(AuthenticationService_1.AuthenticationService);
authController.post("/login", FieldCheckMiddleware_1.FieldCheckMiddleware, (req, res, next) => {
    let { email, password } = req.body;
    if (email && password) {
        authenticationService.Auth(email, password).then(token => res.json({ access_token: token })).catch(() => next(HttpException_1.HttpException.UNAUTHORIZED.message("The provided email and password do not match.")));
    }
    else {
        next(HttpException_1.HttpException.UNAUTHORIZED.message("Both email and password fields must not be empty or null."));
    }
});
exports.default = authController;
//# sourceMappingURL=AuthController.js.map