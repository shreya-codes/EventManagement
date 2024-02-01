import { Router } from "express";
import { createEvent, deleteEvent } from "../controller/event.controlller";
// import {
//   createEvent,
//   getAllEvents,
//   getEventById,
//   getEventsByUserId,
//   getEventsNearMe,
//   searchEvents,
// } from "../controllers/event.js";
// import { authGuard } from "../middleware/index.js";

const eventRouter = Router();

eventRouter.post("", createEvent);
eventRouter.delete("/:id", deleteEvent);
eventRouter.get("");
eventRouter.get("/users");
eventRouter.get("/locations");
eventRouter.get("/search");
eventRouter.get("/:eventId");

export { eventRouter };
