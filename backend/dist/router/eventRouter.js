"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = require("express");
const event_controlller_1 = require("../controller/event.controlller");
// import {
//   createEvent,
//   getAllEvents,
//   getEventById,
//   getEventsByUserId,
//   getEventsNearMe,
//   searchEvents,
// } from "../controllers/event.js";
// import { authGuard } from "../middleware/index.js";
const eventRouter = (0, express_1.Router)();
exports.eventRouter = eventRouter;
eventRouter.post("", event_controlller_1.createEvent);
eventRouter.delete("/:id", event_controlller_1.deleteEvent);
eventRouter.get("");
eventRouter.get("/users");
eventRouter.get("/locations");
eventRouter.get("/search");
eventRouter.get("/:eventId");
//# sourceMappingURL=eventRouter.js.map