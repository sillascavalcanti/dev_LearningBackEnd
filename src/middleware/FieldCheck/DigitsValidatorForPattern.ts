export class DigitsValidatorForPattern {
  
  private VERIFICATION_REMAINDER_VALUE: number;

  constructor(verification: number = 11){
    this.VERIFICATION_REMAINDER_VALUE = verification;
  }

  public validateForPattern(formatPattern: RegExp, value: string, weights: number[][], invalidValue: string[]): boolean{
    if (!formatPattern.test(value) || invalidValue.includes(value)) {
      return false;
    }
    const digits = this.extractDigits(value);
    return weights.map((weight: number[]) => this.calculateVerificationDigit(digits, weight)).map((v: number, i: number) => v === digits[digits.length - weights.length + i]).reduce((p: boolean, v: boolean) => p && v);
  }
  
  private extractDigits(v: string): number[] {
    return Array.from(v).map(Number).filter(c => !isNaN(c));
  }
  
  private calculateVerificationDigit(digits: number[], weight: number[]): number {


    let sumOfWeightedDigits: number = weight.reduce((p: number, v: number, i: number) => p + (v*digits[i]), 0);

    let remainder: number = this.VERIFICATION_REMAINDER_VALUE - (sumOfWeightedDigits % this.VERIFICATION_REMAINDER_VALUE);

    return (remainder >= this.VERIFICATION_REMAINDER_VALUE - 1) ? 0 : remainder;
  }
}