"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldCheckMiddleware = void 0;
const FieldValidation_1 = require("./FieldValidation");
const HttpException_1 = require("../../exception/HttpException");
const FieldCheckMiddleware = (req, res, next) => {
    let { valid, errorMessage } = Object.keys(req.body).reduce((acc, field) => {
        let validators = FieldValidation_1.validations[field] || [];
        validators.forEach(v => {
            let result = v.validateFunction(req.body[field]);
            acc.valid = acc.valid && result;
            if (!result) {
                if (acc.errorMessage[field] === undefined)
                    acc.errorMessage[field] = [];
                acc.errorMessage[field].push(v.message);
            }
        });
        return acc;
    }, { valid: true, errorMessage: {} });
    if (valid) {
        next();
    }
    else {
        next(HttpException_1.HttpException.BAD_REQUEST.message(errorMessage));
    }
};
exports.FieldCheckMiddleware = FieldCheckMiddleware;
//# sourceMappingURL=FieldCheckMiddleware.js.map