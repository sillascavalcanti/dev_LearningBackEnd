import Address from "./Address";
import CreatedBy from "./CreatedBy";

export default class Event {

  readonly id? : string;
  createdBy: CreatedBy;
  readonly title: string;
  readonly description: string;
  readonly contact: string;
  readonly picture: string;
  readonly date: Date;
  readonly address: Address;

  constructor(id: string | null, createdById: string | undefined, createdByName: string | undefined, title: string, description: string, contact: string,picture: string, date: Date, street: string, number: number, complement: string | undefined, neighborhood: string, city: string, state: string, postalCode: string){
    if(id !== null) this.id = id;
    this.createdBy = {id: createdById, name: createdByName} as CreatedBy;
    this.title = title;
    this.description = description;
    this.contact =  contact;
    this.picture = picture;
    this.date = date;
    this.address = {street, number, complement, neighborhood, city, state, postalCode} as Address;
  }

  public setCreatedBy(id: string, name: string): void{
    this.createdBy = {id, name} as CreatedBy;
  }
}