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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepositoryImpl = void 0;
const tsyringe_1 = require("tsyringe");
const Event_1 = __importDefault(require("../../model/Event"));
const Firestore_1 = require("../../config/Firestore");
let EventRepositoryImpl = class EventRepositoryImpl {
    constructor(database) {
        this.database = database.firestore();
    }
    findById(id) {
        return this.database.collection('event').doc(id).get().then(doc => {
            if (doc.data() === undefined)
                throw new Error("Event not found.");
            return this.snapshotToEvent(doc);
        });
    }
    findAll() {
        return this.database.collection('event').get().then(snapshot => snapshot.docs.map(this.snapshotToEvent));
    }
    save(event) {
        return new Promise((resolve, reject) => {
            this.database.collection('event').add(Object.assign({}, event)).then((_) => resolve(event)).catch(reject);
        });
    }
    snapshotToEvent(snapshot) {
        return new Event_1.default(snapshot.id, snapshot.get('createdBy.id'), snapshot.get('createdBy.name'), snapshot.get('title'), snapshot.get('description'), snapshot.get('contact'), snapshot.get('picture'), snapshot.get('date'), snapshot.get('address.street'), snapshot.get('address.number'), snapshot.get('address.complement'), snapshot.get('address.neighborhood'), snapshot.get('address.city'), snapshot.get('address.state'), snapshot.get('address.postalCode'));
    }
};
exports.EventRepositoryImpl = EventRepositoryImpl;
exports.EventRepositoryImpl = EventRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(Firestore_1.Firebase)),
    __metadata("design:paramtypes", [Firestore_1.Firebase])
], EventRepositoryImpl);
//# sourceMappingURL=EventRepositoryImpl.js.map