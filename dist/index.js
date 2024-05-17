"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import authenticationService from './service/AuthenticationService'
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const AuthController_1 = __importDefault(require("./controller/AuthController"));
const UserController_1 = __importDefault(require("./controller/UserController"));
const ExceptionHandleMiddleware_1 = __importDefault(require("./middleware/ExceptionHandleMiddleware"));
const logger_1 = __importDefault(require("./logger"));
const EventController_1 = __importDefault(require("./controller/EventController"));
const NotFoundHandleMiddleware_1 = __importDefault(require("./middleware/NotFoundHandleMiddleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
app.use("/auth", AuthController_1.default);
app.use("/user", UserController_1.default);
app.use("/event", EventController_1.default);
app.use(NotFoundHandleMiddleware_1.default);
app.use(ExceptionHandleMiddleware_1.default);
app.listen(port, () => {
    logger_1.default.info(`Server is running at http://localhost:${port}`);
});
module.exports = app;
//# sourceMappingURL=index.js.map