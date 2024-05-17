// import authenticationService from './service/AuthenticationService'
import "reflect-metadata";
import express, { Express, Request } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authController from "./controller/AuthController";
import userController from "./controller/UserController";
import ExceptionHandleMiddleware from "./middleware/ExceptionHandleMiddleware";
import logger from "./logger";
import eventController from "./controller/EventController";
import NotFoundMeddleware from "./middleware/NotFoundHandleMiddleware";

dotenv.config();

const app: Express = express();
app.use(cors<Request>());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/auth", authController);
app.use("/user", userController);
app.use("/event", eventController);

app.use(NotFoundMeddleware);
app.use(ExceptionHandleMiddleware);


app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});

module.exports = app;