"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Event {
    constructor(id, createdById, createdByName, title, description, contact, picture, date, street, number, complement, neighborhood, city, state, postalCode) {
        if (id !== null)
            this.id = id;
        this.createdBy = { id: createdById, name: createdByName };
        this.title = title;
        this.description = description;
        this.contact = contact;
        this.picture = picture;
        this.date = date;
        this.address = { street, number, complement, neighborhood, city, state, postalCode };
    }
    setCreatedBy(id, name) {
        this.createdBy = { id, name };
    }
}
exports.default = Event;
//# sourceMappingURL=Event.js.map