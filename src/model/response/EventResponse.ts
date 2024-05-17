import Address from "../Address";

export type EventResponse = {
  id: string;
  createdBy: string;
  title: string;
  description: string;
  contact: string;
  picture: string;
  date: Date;
  address: Address;
  }