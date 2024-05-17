import Event from "../model/Event";

export interface EventRepository {
  findAll(): Promise<Event[]>;
  findById(id: string): Promise<Event>;
  save(event: Event): Promise<Event>;
}