"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitsValidatorForPattern = void 0;
class DigitsValidatorForPattern {
    constructor(verification = 11) {
        this.VERIFICATION_REMAINDER_VALUE = verification;
    }
    validateForPattern(formatPattern, value, weights, invalidValue) {
        if (!formatPattern.test(value) || invalidValue.includes(value)) {
            return false;
        }
        const digits = this.extractDigits(value);
        return weights.map((weight) => this.calculateVerificationDigit(digits, weight)).map((v, i) => v === digits[digits.length - weights.length + i]).reduce((p, v) => p && v);
    }
    extractDigits(v) {
        return Array.from(v).map(Number).filter(c => !isNaN(c));
    }
    calculateVerificationDigit(digits, weight) {
        let sumOfWeightedDigits = weight.reduce((p, v, i) => p + (v * digits[i]), 0);
        let remainder = this.VERIFICATION_REMAINDER_VALUE - (sumOfWeightedDigits % this.VERIFICATION_REMAINDER_VALUE);
        return (remainder >= this.VERIFICATION_REMAINDER_VALUE - 1) ? 0 : remainder;
    }
}
exports.DigitsValidatorForPattern = DigitsValidatorForPattern;
//# sourceMappingURL=DigitsValidatorForPattern.js.map