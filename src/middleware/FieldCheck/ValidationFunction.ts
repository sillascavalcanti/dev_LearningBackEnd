import Address from "../../model/Address";
import { DigitsValidatorForPattern } from "./DigitsValidatorForPattern";

export abstract class ValidationFunction {

  static readonly NONNULL: (v: string) => boolean = (v: string) => v !== null;
  
  static readonly PATTERN:(pattern: RegExp) => (v: string) => boolean = (pattern: RegExp) => (v: string) => pattern.test(v);

  static readonly NONBLANK: (v: string) => boolean = (v: string) => !this.PATTERN(/^\s+$/)(v) && this.NONNULL(v) && v.length > 0;

  static readonly MINSIZE: (min: number) => (v: string) => boolean = (min: number) => (v: string) => v.length >= min;

  static readonly MAXSIZE: (max: number) => (v: string) => boolean = (max: number) => (v: string) => v.length < max;

  static readonly SIZE: (min: number, max: number) => (v: string) => boolean = (min: number, max: number) => (v: string) => this.MINSIZE(min)(v) && this.MAXSIZE(max)(v);

  static readonly EMAIL: (v: string) => boolean = (v: string) => this.PATTERN(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z.]{2,}$/)(v);

  static readonly CELLPHONE: (v: string) => boolean = (v: string) => this.PATTERN(/^\(\d{2}\)\s9\d{4}-\d{4}$/)(v);

  static readonly PHONE: (v: string) => boolean = (v: string) => this.PATTERN(/^\(\d{2}\)\s\d{4}-\d{4}$/)(v);

  static readonly PASSWORD: (v: string) => boolean = (v: string) => this.PATTERN(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)(v)

  static readonly ADDRESS: (v: Address) => boolean = (v: Address) => this.NONBLANK(v.street) && this.MIN(0)(v.number) && this.NONBLANK(v.neighborhood) && this.NONBLANK(v.city) && this.NONBLANK(v.state) && this.NONBLANK(v.state) && this.PATTERN(/^\d{5}-\d{3}$/)(v.postalCode);

  static readonly CPF: (v: string) => boolean = (v: string) => {
    const INVALID_VALUE: string[] = ['000.000.000-00', '111.111.111-11', '222.222.222-22', '333.333.333-33', '444.444.444-44', '555.555.555-55', '666.666.666-66', '777.777.777-77', '888.888.888-88', '999.999.999-99'];
    const CPF_WEIGHT: number[][] = [[10, 9, 8, 7, 6, 5, 4, 3, 2], [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]];
    const FORMAT_PATTERN: RegExp = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    return (new DigitsValidatorForPattern()).validateForPattern(FORMAT_PATTERN, v, CPF_WEIGHT, INVALID_VALUE);

  }

  static readonly CNPJ: (v: string) => boolean = (v: string) => {
    const INVALID_VALUE: string[] = ['00.000.000/0000-00', '11.111.111/1111-11', '22.222.222/2222-22', '33.333.333/3333-33', '44.444.444/4444-44', '55.555.555/5555-55', '66.666.666/6666-66', '77.777.777/7777-77', '88.888.888/8888-88', '99.999.999/9999-99'];
    const CNPJ_WEIGHT: number[][] = [[5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2], [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]];
    const FORMAT_PATTERN: RegExp = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

    return  (new DigitsValidatorForPattern()).validateForPattern(FORMAT_PATTERN, v, CNPJ_WEIGHT, INVALID_VALUE);
  }

  static readonly MIN:(min: number) => (v: number) => boolean = (min: number) => (v: number) => v > min;
  
  static readonly MAX:(max: number) => (v: number) => boolean = (max: number) => (v: number) => v < max;
  
  static readonly RANGE:(min:number, max: number) => (v: number) => boolean = (min:number, max: number) => (v: number) => this.MIN(min)(v) && this.MAX(max)(v);

  static readonly URL: (v: string) => boolean = (v: string) => this.PATTERN(/^(http|https):\/\/[^ "]+$/)(v);
}