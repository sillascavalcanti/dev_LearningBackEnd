"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../exception/HttpException");
const AuthenticationService_1 = require("../service/AuthenticationService");
const tsyringe_1 = require("tsyringe");
const authenticationService = tsyringe_1.container.resolve(AuthenticationService_1.AuthenticationService);
const AuthMiddleware = (req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    let authHeader = req.headers.authorization;
    let token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.replace("Bearer ", "").trim();
    try {
        if (token !== undefined) {
            let user = yield authenticationService.validate(token);
            if (user.id != null) {
                req.params['__user_id__'] = user.id;
            }
            req.params['__user_name__'] = user.fullname;
            next();
        }
        else {
            next(HttpException_1.HttpException.UNAUTHORIZED.message("The 'Bearer' token was not passed in the request header."));
        }
    }
    catch (error) {
        next(HttpException_1.HttpException.UNAUTHORIZED.message("The JWT token provided is not valid."));
    }
});
exports.default = AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map