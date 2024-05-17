"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HttpException_1 = require("../exception/HttpException");
const AuthMiddleware_1 = __importDefault(require("../middleware/AuthMiddleware"));
const tsyringe_1 = require("tsyringe");
const EventServiceImpl_1 = require("../service/impl/EventServiceImpl");
const FieldCheckMiddleware_1 = require("../middleware/FieldCheck/FieldCheckMiddleware");
const eventController = express_1.default.Router();
const eventService = tsyringe_1.container.resolve(EventServiceImpl_1.EventServiceImpl);
eventController.get('/', (req, res, next) => {
    eventService.findAll().then(e => { res.json(e); }).catch((e) => {
        next(HttpException_1.HttpException.INTERNAL.message(e));
    });
});
eventController.get('/:id', (req, res, next) => {
    eventService.findById(req.params['id']).then(e => { res.json(e); }).catch((e) => {
        next(HttpException_1.HttpException.NOT_FOUND.message(e.message));
    });
});
eventController.post('/', AuthMiddleware_1.default, FieldCheckMiddleware_1.FieldCheckMiddleware, (req, res, next) => {
    eventService.save(req.params['__user_id__'], req.params['__user_name__'], req.body).then(e => { res.json(e); }).catch((e) => {
        next(HttpException_1.HttpException.INTERNAL.message(e));
    });
});
exports.default = eventController;
//# sourceMappingURL=EventController.js.map