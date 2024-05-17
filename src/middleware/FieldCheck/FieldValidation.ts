import Address from "../../model/Address";
import { ValidationFunction } from "./ValidationFunction";

type FieldValidation<T> = {
  validateFunction: ((arg0: T) => boolean),
  message: string
};

export const validations: { [field: string]: FieldValidation<any>[] } = {
  'fullname': [
    {
      validateFunction: ValidationFunction.NONBLANK,
      message: 'Full name must not be null or empty.'
    } as FieldValidation<string>,
    {
      validateFunction: ValidationFunction.SIZE(3,50),
      message: 'Full name must be between 3 and 50 characters.'
    } as FieldValidation<string>
  ],
  'email': [
    {
      validateFunction: ValidationFunction.NONBLANK,
      message: 'The email must not be null or empty.'
    } as FieldValidation<string>,
    {
      validateFunction: ValidationFunction.EMAIL,
      message: 'The email format is invalid. It should match the pattern: example@example.com.'
    } as FieldValidation<string>
  ],
  'password': [
    {
      validateFunction: ValidationFunction.NONBLANK,
      message: 'The password must not be null or empty.'
    } as FieldValidation<string>,
    {
      validateFunction: ValidationFunction.PASSWORD,
      message: 'The password format is invalid. It must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.'
    } as FieldValidation<string>
  ],
  'document': [
    {
      validateFunction: ValidationFunction.NONBLANK,
      message: 'The document must not be null or empty.'
    } as FieldValidation<string>,
    {
      validateFunction: (v: string) =>  ValidationFunction.CPF(v) || ValidationFunction.CNPJ(v),
      message: 'The document format is invalid. It should match the pattern: XXX.XXX.XXX-XX for CPF or XX.XXX.XXX/XXXX-XX for CNPJ.'
    } as FieldValidation<string>
  ],
  'phone': [
    {
      validateFunction: ValidationFunction.NONBLANK,
      message: 'The phone must not be null or empty.'
    } as FieldValidation<string>,
    {
      validateFunction: (v: string) => ValidationFunction.PHONE(v) || ValidationFunction.CELLPHONE(v),
      message: 'The phone format is invalid. It should match the pattern: (XX) XXXX-XXXX for phone or (XX) 9XXXX-XXXX for cellphone.'
    } as FieldValidation<string>
  ],
  'address': [
    {
      validateFunction: ValidationFunction.ADDRESS,
      message: 'The address format is invalid. Please provide a valid address.'
    } as FieldValidation<Address>
  ],
  'title': [
    {
      validateFunction: ValidationFunction.NONBLANK,
      message: 'The title must not be null or empty.'
    } as FieldValidation<string>,
    {
      validateFunction: ValidationFunction.SIZE(3,50),
      message: 'The title must be between 3 and 50 characters.'
    } 
  ],
  'description': [
    {
      validateFunction: ValidationFunction.NONBLANK,
      message: 'The description must not be null or empty.'
    } as FieldValidation<string>
  ],
  'contact': [
    {
      validateFunction: (v: string) => ValidationFunction.PHONE(v) || ValidationFunction.CELLPHONE(v),
      message: 'The contact format is invalid. It should match the pattern: (XX) XXXX-XXXX for phone or (XX) 9XXXX-XXXX for cellphone.'
    } as FieldValidation<string>
  ],
  'picture': [
    {
      validateFunction: ValidationFunction.URL,
      message: 'The picture format is invalid. It should match the pattern: http://www.example.com or https://www.example.com .'
    } as FieldValidation<string>
  ]
}
