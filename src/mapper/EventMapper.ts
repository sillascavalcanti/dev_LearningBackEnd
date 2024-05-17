import Event from "../model/Event";
import { EventRequest } from "../model/request/EventRequest";
import { EventResponse } from "../model/response/EventResponse";

export abstract class EventMapper {
  
  static toResponse(event: Event): EventResponse {
    return {id: event.id, createdBy: event.createdBy.name, title: event.title, description: event.description, contact: event.contact,picture: event.picture, date: event.date, address: event.address} as EventResponse;
  }

  static toEntity(request: EventRequest): Event{
    return new Event(null, undefined, undefined, request.title, request.description, request.contact,request.picture, request.date, request.address.street, request.address.number, request.address.complement, request.address.neighborhood, request.address.city, request.address.state, request.address.postalCode);
  } 
}