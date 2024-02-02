import { EventModel, IEvent } from "../models/Event.model";

const insertEvent = async (eventData: IEvent) => {
  try {
    const event = new EventModel({ ...eventData });
    const newEvent = await event.save();
    return newEvent;
  } catch (error) {
    throw new Error(`Could not insert event: ${error.message}`);
  }
};

const getEvent = async (selector) => {
  try {
    const event = await EventModel.find({
      ...selector,
      deleted: { $ne: true },
    });
    if (!event.length) {
      throw new Error(`Could not find event with ${{ ...selector }} `);
    }
    return event;
  } catch (error) {
    throw new Error(`Error while getting event: ${error.message}`);
  }
};

const getEvents = async (selector = {}) => {
  try {
    const event = await EventModel.find({
      ...selector,
      deleted: { $ne: true },
    });

    if (!event) {
      throw new Error(`Could not find events with ${selector}`);
    }

    return event;
  } catch (error) {
    throw new Error("Could not get event");
  }
};
const removeEvent = async (id: string) => {
  try {
    const removedEvent = await EventModel.findOneAndUpdate(
      { _id: id, deleted: { $ne: true } },
      { $set: { deleted: true, deletedAt: new Date() } },
      { runValidators: true, new: true }
    );

    if (!removedEvent) {
      throw new Error(`Could not find event with ID ${id}`);
    }

    return removedEvent;
  } catch (error) {
    throw new Error(`Could not remove event with ID ${id}`);
  }
};

const updateEvent = async (event: IEvent) => {
  try {
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
      throw new Error(`error while updating  event ${event._id}`);
    }
    return updatedEvent;
  } catch (error) {
    throw new Error(`Could not update event with ID ${event._id}`);
  }
};

export { insertEvent, getEvent, getEvents, removeEvent, updateEvent };
