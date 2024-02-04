import { Request, Response, NextFunction } from "express";
import {
  insertEvent,
  removeEvent,
  updateEvent as updateEventRepository,
  getEvent as getEventRepository,
  getEvents as getEventsRepository,
} from "../repositories/eventRepository";

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdEvent = await insertEvent({
      ...req.body,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
    });
    return res.status(201).json({ success: true, ...createdEvent });
  } catch (error) {
    return next(error.message);
  }
};

const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventId = req.params.id;

    // Validate the eventId
    if (!eventId) {
      return res
        .status(400)
        .json({ success: false, message: "Event ID is required" });
    }
    await removeEvent(eventId);
    return res.status(204).json({ success: true, message: "Deleted Event" });
  } catch (error) {
    return next(error.message);
  }
};

const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid update request" });
    }
    const updatedEvent = await updateEventRepository({
      ...req.body,
      _id: req.params.id,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
    });
    return res.status(200).json({ success: true, ...updatedEvent });
  } catch (error) {
    return next(error.message);
  }
};

const getEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventId = req.params.id;
    // Validate the eventId
    if (!eventId) {
      return res
        .status(400)
        .json({ success: false, message: "Event ID is required" });
    }

    const event = await getEventRepository({ _id: eventId });
    return res.status(200).json({ success: true, ...event });
  } catch (error) {
    return next(error);
  }
};
const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await getEventsRepository({});
    return res.status(200).json({ success: true, ...event });
  } catch (error) {
    return next(error);
  }
};
export { createEvent, getEvent, getEvents, updateEvent, deleteEvent };
