import { container, inject, injectable } from "tsyringe";
import { EventMapper } from "../../mapper/EventMapper";
import Event from "../../model/Event";
import { EventRequest } from "../../model/request/EventRequest";
import { EventResponse } from "../../model/response/EventResponse";
import { EventRepository } from "../../repository/EventRepository";
import { EventRepositoryImpl } from "../../repository/impl/EventRepositoryImpl";
import { EventService } from "../EventService";

@injectable()
export class EventServiceImpl implements EventService {

  private eventRepository: EventRepository;

  constructor(@inject(EventRepositoryImpl) eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }
  findById(id: string): Promise<EventResponse> {
    return this.eventRepository.findById(id).then(EventMapper.toResponse);
  }
  
  public save(id: string, name: string, event: EventRequest): Promise<EventResponse> {
    let eventEntity: Event = EventMapper.toEntity(event);
    eventEntity.setCreatedBy(id, name);
    return this.eventRepository.save(eventEntity).then(EventMapper.toResponse);
  }

  public findAll(): Promise<EventResponse[]> {
    return this.eventRepository.findAll().then(events => events.map(EventMapper.toResponse));
  }

}