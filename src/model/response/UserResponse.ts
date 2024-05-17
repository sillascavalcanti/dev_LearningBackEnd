import Address from "../Address";

export type UserResponse = {
    fullname: string;
    email: string;
    document: string;
    phone: string;
    address: Address;
  }