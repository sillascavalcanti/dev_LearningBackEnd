"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationFunction = void 0;
const DigitsValidatorForPattern_1 = require("./DigitsValidatorForPattern");
class ValidationFunction {
}
exports.ValidationFunction = ValidationFunction;
_a = ValidationFunction;
ValidationFunction.NONNULL = (v) => v !== null;
ValidationFunction.PATTERN = (pattern) => (v) => pattern.test(v);
ValidationFunction.NONBLANK = (v) => !_a.PATTERN(/^\s+$/)(v) && _a.NONNULL(v) && v.length > 0;
ValidationFunction.MINSIZE = (min) => (v) => v.length >= min;
ValidationFunction.MAXSIZE = (max) => (v) => v.length < max;
ValidationFunction.SIZE = (min, max) => (v) => _a.MINSIZE(min)(v) && _a.MAXSIZE(max)(v);
ValidationFunction.EMAIL = (v) => _a.PATTERN(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z.]{2,}$/)(v);
ValidationFunction.CELLPHONE = (v) => _a.PATTERN(/^\(\d{2}\)\s9\d{4}-\d{4}$/)(v);
ValidationFunction.PHONE = (v) => _a.PATTERN(/^\(\d{2}\)\s\d{4}-\d{4}$/)(v);
ValidationFunction.PASSWORD = (v) => _a.PATTERN(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)(v);
ValidationFunction.ADDRESS = (v) => _a.NONBLANK(v.street) && _a.MIN(0)(v.number) && _a.NONBLANK(v.neighborhood) && _a.NONBLANK(v.city) && _a.NONBLANK(v.state) && _a.NONBLANK(v.state) && _a.PATTERN(/^\d{5}-\d{3}$/)(v.postalCode);
ValidationFunction.CPF = (v) => {
    const INVALID_VALUE = ['000.000.000-00', '111.111.111-11', '222.222.222-22', '333.333.333-33', '444.444.444-44', '555.555.555-55', '666.666.666-66', '777.777.777-77', '888.888.888-88', '999.999.999-99'];
    const CPF_WEIGHT = [[10, 9, 8, 7, 6, 5, 4, 3, 2], [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]];
    const FORMAT_PATTERN = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return (new DigitsValidatorForPattern_1.DigitsValidatorForPattern()).validateForPattern(FORMAT_PATTERN, v, CPF_WEIGHT, INVALID_VALUE);
};
ValidationFunction.CNPJ = (v) => {
    const INVALID_VALUE = ['00.000.000/0000-00', '11.111.111/1111-11', '22.222.222/2222-22', '33.333.333/3333-33', '44.444.444/4444-44', '55.555.555/5555-55', '66.666.666/6666-66', '77.777.777/7777-77', '88.888.888/8888-88', '99.999.999/9999-99'];
    const CNPJ_WEIGHT = [[5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2], [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]];
    const FORMAT_PATTERN = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return (new DigitsValidatorForPattern_1.DigitsValidatorForPattern()).validateForPattern(FORMAT_PATTERN, v, CNPJ_WEIGHT, INVALID_VALUE);
};
ValidationFunction.MIN = (min) => (v) => v > min;
ValidationFunction.MAX = (max) => (v) => v < max;
ValidationFunction.RANGE = (min, max) => (v) => _a.MIN(min)(v) && _a.MAX(max)(v);
ValidationFunction.URL = (v) => _a.PATTERN(/^(http|https):\/\/[^ "]+$/)(v);
//# sourceMappingURL=ValidationFunction.js.map