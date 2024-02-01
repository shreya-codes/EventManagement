import { EventModel, IEvent } from "../models/Event.model";

const insertEvent = async (eventData: IEvent) => {
  const event = new EventModel({ ...eventData });
  await event.save();
  return event;
};
const getEvent = async (selector) => {
  const event = await EventModel.findOne({
    ...selector,
    deleted: { $ne: true },
  });
  if (!event) {
    throw new Error(`Couldnot find event with ${selector}`);
  }

  return event;
};

const removeEvent = async (id: string) => {
  const removedEvent = await EventModel.findOneAndUpdate(
    { _id: id, deleted: { $ne: true } },
    { $set: { deleted: true, deletedAt: new Date() } },
    { runValidators: true, new: true }
  );
  console.log(removeEvent, "remo");
  if (!removedEvent) {
    throw new Error(`error while deleting event ${id}`);
  }

  return removedEvent;
};
export { insertEvent, getEvent, removeEvent };
