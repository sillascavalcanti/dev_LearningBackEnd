import express, { Request, Response, Router, NextFunction } from "express";
import { HttpException } from "../exception/HttpException";
import AuthMiddleware from "../middleware/AuthMiddleware";
import { EventRequest } from "../model/request/EventRequest";
import { EventService } from "../service/EventService";
import { container } from "tsyringe";
import { EventServiceImpl } from "../service/impl/EventServiceImpl";
import { FieldCheckMiddleware } from "../middleware/FieldCheck/FieldCheckMiddleware";

const eventController: Router = express.Router();
const eventService: EventService = container.resolve(EventServiceImpl);

eventController.get('/', (req: Request, res: Response, next: NextFunction) => {
  eventService.findAll().then(e => { res.json(e) }).catch((e) => {
    next(HttpException.INTERNAL.message(e));
  });
});

eventController.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  eventService.findById(req.params['id']).then(e => { res.json(e) }).catch((e) => {
    next(HttpException.NOT_FOUND.message(e.message));
  });
});

eventController.post('/', AuthMiddleware, FieldCheckMiddleware, (req: Request, res: Response, next: NextFunction) => {
  eventService.save(req.params['__user_id__'], req.params['__user_name__'], req.body as EventRequest).then(e => { res.json(e) }).catch((e) => {
    next(HttpException.INTERNAL.message(e));
  });
});

export default eventController;