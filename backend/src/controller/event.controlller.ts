import { NextFunction, type Request, type Response } from "express";
import { insertEvent, removeEvent } from "../repositories/eventRepository";
const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, location, startDate, endDate } = req.body;
    const createdEvent = await insertEvent(req.body);
    return res.status(201).send({ success: true, ...createdEvent });
  } catch (error) {
    return next(error);
  }
};

const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.params, "-----------");
    const removedEvent = await removeEvent(req.params.id);
    return res.status(204).send({ success: true });
  } catch (error) {
    return next(error);
  }
};

const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedEvent = { eve: "update event" };
    return res.status(200).send({ success: true, ...updatedEvent });
  } catch (error) {
    return next(error);
  }
};
const getEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = { eve: "create event" };
    return res.status(200).send({ success: true, ...event });
  } catch (error) {
    return next(error);
  }
};

export { createEvent, getEvent, updateEvent, deleteEvent };
