"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this._message = message;
        this.timestamp = new Date();
    }
}
exports.HttpException = HttpException;
HttpException.UNAUTHORIZED = { message: (msg) => new HttpException(401, msg) };
HttpException.CONFLICT = { message: (msg) => new HttpException(409, msg) };
HttpException.NOT_FOUND = { message: (msg) => new HttpException(404, msg) };
HttpException.INTERNAL = { message: (msg) => new HttpException(500, msg) };
HttpException.BAD_REQUEST = { message: (msg) => new HttpException(400, msg) };
//# sourceMappingURL=HttpException.js.map