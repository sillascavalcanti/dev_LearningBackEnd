import { EventRequest } from "../model/request/EventRequest";
import { EventResponse } from "../model/response/EventResponse";

export interface EventService{
  findAll(): Promise<EventResponse[]>;
  findById(id: string): Promise<EventResponse>;
  save(id: string, name: string, event: EventRequest): Promise<EventResponse>;
}