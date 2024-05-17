"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validations = void 0;
const ValidationFunction_1 = require("./ValidationFunction");
exports.validations = {
    'fullname': [
        {
            validateFunction: ValidationFunction_1.ValidationFunction.NONBLANK,
            message: 'Full name must not be null or empty.'
        },
        {
            validateFunction: ValidationFunction_1.ValidationFunction.SIZE(3, 50),
            message: 'Full name must be between 3 and 50 characters.'
        }
    ],
    'email': [
        {
            validateFunction: ValidationFunction_1.ValidationFunction.NONBLANK,
            message: 'The email must not be null or empty.'
        },
        {
            validateFunction: ValidationFunction_1.ValidationFunction.EMAIL,
            message: 'The email format is invalid. It should match the pattern: example@example.com.'
        }
    ],
    'password': [
        {
            validateFunction: ValidationFunction_1.ValidationFunction.NONBLANK,
            message: 'The password must not be null or empty.'
        },
        {
            validateFunction: ValidationFunction_1.ValidationFunction.PASSWORD,
            message: 'The password format is invalid. It must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.'
        }
    ],
    'document': [
        {
            validateFunction: ValidationFunction_1.ValidationFunction.NONBLANK,
            message: 'The document must not be null or empty.'
        },
        {
            validateFunction: (v) => ValidationFunction_1.ValidationFunction.CPF(v) || ValidationFunction_1.ValidationFunction.CNPJ(v),
            message: 'The document format is invalid. It should match the pattern: XXX.XXX.XXX-XX for CPF or XX.XXX.XXX/XXXX-XX for CNPJ.'
        }
    ],
    'phone': [
        {
            validateFunction: ValidationFunction_1.ValidationFunction.NONBLANK,
            message: 'The phone must not be null or empty.'
        },
        {
            validateFunction: (v) => ValidationFunction_1.ValidationFunction.PHONE(v) || ValidationFunction_1.ValidationFunction.CELLPHONE(v),
            message: 'The phone format is invalid. It should match the pattern: (XX) XXXX-XXXX for phone or (XX) 9XXXX-XXXX for cellphone.'
        }
    ],
    'address': [
        {
            validateFunction: ValidationFunction_1.ValidationFunction.ADDRESS,
            message: 'The address format is invalid. Please provide a valid address.'
        }
    ],
    'title': [
        {
            validateFunction: ValidationFunction_1.ValidationFunction.NONBLANK,
            message: 'The title must not be null or empty.'
        },
        {
            validateFunction: ValidationFunction_1.ValidationFunction.SIZE(3, 50),
            message: 'The title must be between 3 and 50 characters.'
        }
    ],
    'description': [
        {
            validateFunction: ValidationFunction_1.ValidationFunction.NONBLANK,
            message: 'The description must not be null or empty.'
        }
    ],
    'contact': [
        {
            validateFunction: (v) => ValidationFunction_1.ValidationFunction.PHONE(v) || ValidationFunction_1.ValidationFunction.CELLPHONE(v),
            message: 'The contact format is invalid. It should match the pattern: (XX) XXXX-XXXX for phone or (XX) 9XXXX-XXXX for cellphone.'
        }
    ],
    'picture': [
        {
            validateFunction: ValidationFunction_1.ValidationFunction.URL,
            message: 'The picture format is invalid. It should match the pattern: http://www.example.com or https://www.example.com .'
        }
    ]
};
//# sourceMappingURL=FieldValidation.js.map