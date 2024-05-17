"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventMapper = void 0;
const Event_1 = __importDefault(require("../model/Event"));
class EventMapper {
    static toResponse(event) {
        return { id: event.id, createdBy: event.createdBy.name, title: event.title, description: event.description, contact: event.contact, picture: event.picture, date: event.date, address: event.address };
    }
    static toEntity(request) {
        return new Event_1.default(null, undefined, undefined, request.title, request.description, request.contact, request.picture, request.date, request.address.street, request.address.number, request.address.complement, request.address.neighborhood, request.address.city, request.address.state, request.address.postalCode);
    }
}
exports.EventMapper = EventMapper;
//# sourceMappingURL=EventMapper.js.map