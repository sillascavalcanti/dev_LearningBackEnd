import Address from "../Address";

export type UserRequest = {
  fullname: string;
  email: string;
  password: string;
  document: string;
  phone: string;
  address: Address;
}