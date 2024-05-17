"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventServiceImpl = void 0;
const tsyringe_1 = require("tsyringe");
const EventMapper_1 = require("../../mapper/EventMapper");
const EventRepositoryImpl_1 = require("../../repository/impl/EventRepositoryImpl");
let EventServiceImpl = class EventServiceImpl {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    findById(id) {
        return this.eventRepository.findById(id).then(EventMapper_1.EventMapper.toResponse);
    }
    save(id, name, event) {
        let eventEntity = EventMapper_1.EventMapper.toEntity(event);
        eventEntity.setCreatedBy(id, name);
        return this.eventRepository.save(eventEntity).then(EventMapper_1.EventMapper.toResponse);
    }
    findAll() {
        return this.eventRepository.findAll().then(events => events.map(EventMapper_1.EventMapper.toResponse));
    }
};
exports.EventServiceImpl = EventServiceImpl;
exports.EventServiceImpl = EventServiceImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(EventRepositoryImpl_1.EventRepositoryImpl)),
    __metadata("design:paramtypes", [Object])
], EventServiceImpl);
//# sourceMappingURL=EventServiceImpl.js.map