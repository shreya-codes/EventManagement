import { EventModel, IEvent } from "../models/Event.model";
import { APIError } from "../error/error";
import { ErrorMap } from "../constants/error.constants";

const insertEvent = async (eventData: IEvent, next) => {
  const event = new EventModel({ ...eventData });
  const newEvent = await event.save();
  return newEvent;
};

const getEvent = async (selector) => {
  const event = await EventModel.find({
    ...selector,
    deleted: { $ne: true },
  });
  if (!event.length) {
    throw new APIError(
      ErrorMap.NotFoundError("Event"),
      `Could not find event with ${{ ...selector }} `,
      selector
    );
  }
  return event;
};

const getEvents = async (selector = {}) => {
  const events = await EventModel.find({
    ...selector,
    deleted: { $ne: true },
  });
  if (!events) {
    throw new APIError(
      ErrorMap.NotFoundError("Event"),
      `Could not find event with ${{ ...selector }} `,
      selector
    );
  }

  const formattedEvents = events.map((event) => ({
    ...event.toObject(),
    startDate: event.startDate.toISOString().split("T")[0],
    endDate: event.endDate.toISOString().split("T")[0],
  }));

  return formattedEvents;
};

const removeEvent = async (id: string) => {
  const removedEvent = await EventModel.findOneAndUpdate(
    { _id: id, deleted: { $ne: true } },
    { $set: { deleted: true, deletedAt: new Date() } },
    { runValidators: true, new: true }
  );

  if (!removedEvent) {
    throw new APIError(
      ErrorMap.NotFoundError("Event"),
      "Error while deleting",
      { _id: id, deleted: { $ne: true } }
    );
  }

  return removedEvent;
};

const updateEvent = async (event: IEvent) => {
  // Find the document first
  const updatedEvent = await EventModel.updateOne(
    { _id: event._id, deleted: { $ne: true } },
    { $set: event },
    {
      runValidators: true,
      context: "query",
      upsert: false,
      setDefaultsOnInsert: true,
    }
  );
  if (!updatedEvent) {
    throw new APIError(
      ErrorMap.BadRequestError("Event"),
      `error while updating  event ${event._id}`
    );
  }
  return updatedEvent;
};

export { insertEvent, getEvent, getEvents, removeEvent, updateEvent };
