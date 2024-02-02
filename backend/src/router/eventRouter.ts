import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controller/event.controlller";
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
eventRouter.put("/:id", updateEvent);
eventRouter.get("/:id", getEvent);
eventRouter.get("", getEvents);

export { eventRouter };
