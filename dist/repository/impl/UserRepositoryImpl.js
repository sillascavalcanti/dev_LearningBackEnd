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
exports.UserRepositoryImpl = void 0;
// import database from '../../config/Firestore'
const firestore_1 = require("firebase-admin/firestore");
const User_1 = __importDefault(require("../../model/User"));
const tsyringe_1 = require("tsyringe");
const Firestore_1 = require("../../config/Firestore");
let UserRepositoryImpl = class UserRepositoryImpl {
    constructor(database) {
        this.database = database.firestore();
    }
    save(user) {
        return new Promise((resolve, reject) => {
            this.findByEmailAndDocument(user.email, user.document).then(() => { reject("Already registered email or document."); }).catch(() => {
                this.database.collection('user').add(Object.assign({}, user)).then((_) => resolve(user)).catch(reject);
            });
        });
    }
    findByEmailAndDocument(email, document) {
        let query = this.database.collection('user').where(firestore_1.Filter.or(firestore_1.Filter.where('email', '==', email), firestore_1.Filter.where('document', '==', document))).limit(1);
        return query.get().then(snapshot => {
            let users = snapshot.docs.map(this.snapshotToUser);
            if (users.length === 0)
                throw new Error("User not found.");
            return users[0];
        });
    }
    findUniqueByEmailAndPassword(email, password) {
        let query = this.database.collection('user').where(firestore_1.Filter.and(firestore_1.Filter.where('email', '==', email), firestore_1.Filter.where('password', '==', password))).limit(1);
        return query.get().then(snapshot => {
            let users = snapshot.docs.map(this.snapshotToUser);
            if (users.length === 0)
                throw new Error("User not found.");
            return users[0];
        });
    }
    findById(id) {
        return this.database.collection('user').doc(id).get().then(doc => {
            if (doc.data() === undefined)
                throw new Error("User not found.");
            return this.snapshotToUser(doc);
        });
    }
    snapshotToUser(snapshot) {
        return new User_1.default(snapshot.id, snapshot.get('fullname'), snapshot.get('document'), snapshot.get('password'), snapshot.get('phone'), snapshot.get('email'), snapshot.get('address.street'), snapshot.get('address.number'), snapshot.get('address.complement'), snapshot.get('address.neighborhood'), snapshot.get('address.city'), snapshot.get('address.state'), snapshot.get('address.postalCode'));
    }
};
exports.UserRepositoryImpl = UserRepositoryImpl;
exports.UserRepositoryImpl = UserRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(Firestore_1.Firebase)),
    __metadata("design:paramtypes", [Firestore_1.Firebase])
], UserRepositoryImpl);
//# sourceMappingURL=UserRepositoryImpl.js.map