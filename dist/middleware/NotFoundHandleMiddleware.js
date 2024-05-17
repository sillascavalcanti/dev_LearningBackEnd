"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../exception/HttpException");
const NotFoundMeddleware = (req, res, next) => {
    next(HttpException_1.HttpException.NOT_FOUND.message("The requested endpoint is not available. Please check the URL and try again."));
};
exports.default = NotFoundMeddleware;
//# sourceMappingURL=NotFoundHandleMiddleware.js.map