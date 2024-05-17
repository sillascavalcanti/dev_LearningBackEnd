import Address from "./Address";

export default class User {
  readonly id?: string;
  readonly fullname: string;
  readonly email: string;
  readonly password: string;
  readonly document: string;
  readonly phone: string;
  readonly address: Address;
  
  constructor(id: string | null, fullname: string, document: string, password: string, phone: string, email: string, street: string, number: number, complement: string | undefined, neighborhood: string, city: string, state: string, postalCode: string){
    if(id !== null) this.id = id;
    this.fullname = fullname;
    this.document = document;
    this.password = password;
    this.phone = phone;
    this.email = email;
    this.address = {street, number, complement, neighborhood, city, state, postalCode} as Address;
  }
}