"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const tsyringe_1 = require("tsyringe");
const UserRepositoryImpl_1 = require("../repository/impl/UserRepositoryImpl");
const JWT = __importStar(require("jsonwebtoken"));
let AuthenticationService = class AuthenticationService {
    constructor(userRepository) {
        this.useRepository = userRepository;
        this.iss = process.env.JWT_ISS;
        this.secret = process.env.JWT_SECRET || 'teste';
    }
    Auth(email, password) {
        return this.useRepository.findUniqueByEmailAndPassword(email, password).then((user) => {
            return JWT.sign({ sub: user.id, exp: Date.now() + 3600000, iss: this.iss, iat: Date.now() }, this.secret);
        }).catch(() => {
            throw new Error("Authentication failure.");
        });
    }
    validate(token) {
        return new Promise((resolve, reject) => {
            let options = {
                complete: true
            };
            JWT.verify(token, this.secret, options, (err, jwt) => {
                if (err instanceof JWT.TokenExpiredError) {
                    reject('The token has expired.');
                }
                if (err || jwt === undefined)
                    reject("Illegal Token.");
                let sub = jwt === null || jwt === void 0 ? void 0 : jwt.payload.sub;
                if (typeof sub === 'function') {
                    sub = sub();
                }
                if (sub === undefined) {
                    reject("Sub is undefined.");
                }
                else {
                    this.useRepository.findById(sub).then(resolve).catch(() => reject("Illegal Token."));
                }
            });
        });
    }
};
exports.AuthenticationService = AuthenticationService;
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(UserRepositoryImpl_1.UserRepositoryImpl)),
    __metadata("design:paramtypes", [UserRepositoryImpl_1.UserRepositoryImpl])
], AuthenticationService);
//# sourceMappingURL=AuthenticationService.js.map