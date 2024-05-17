"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const User_1 = __importDefault(require("../model/User"));
class UserMapper {
    static toResponse(user) {
        return { fullname: user.fullname, document: user.document, phone: user.phone, email: user.email, address: user.address };
    }
    static toEntity(request) {
        return new User_1.default(null, request.fullname, request.document, request.password, request.phone, request.email, request.address.street, request.address.number, request.address.complement, request.address.neighborhood, request.address.city, request.address.state, request.address.postalCode);
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=UserMapper.js.map