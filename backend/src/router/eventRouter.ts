import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controller/event.controlller";
import { authMiddleware } from "../middleware/authMiddleware";

const eventRouter = Router();
eventRouter.use(authMiddleware);
eventRouter.post("", createEvent);
eventRouter.delete("/:id", deleteEvent);
eventRouter.put("/:id", updateEvent);
eventRouter.get("/:id", getEvent);
eventRouter.get("", getEvents);

export { eventRouter };
