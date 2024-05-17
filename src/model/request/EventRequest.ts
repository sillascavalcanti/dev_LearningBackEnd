import Address from "../Address";

export type EventRequest = {
  readonly title: string;
  readonly description: string;
  readonly contact: string;
  readonly picture: string;
  readonly date: Date;
  readonly address: Address;
}