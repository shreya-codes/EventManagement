"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const database_1 = __importDefault(require("./config/database"));
const router_1 = require("./router");
// Now you can use authRouter and eventRouter in your code
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
(0, database_1.default)();
app.use((req, res, next) => {
    // log start of api call
    console.log(`Calling EventMangement API ${req.method} ${req.url}`, {
        body: req.body,
        query: req.query,
    });
    next();
});
// Routes
app.use("/events", router_1.eventRouter);
app.use("/auth", router_1.authRouter);
// Error Handling Middleware
// app.use(errorHandler);
app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map