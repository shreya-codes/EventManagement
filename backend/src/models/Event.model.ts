import mongoose from "mongoose";

export interface IEvent {
  _id: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  deleted?: boolean;
  deletedAt?: Date;
}

const eventSchema = new mongoose.Schema<IEvent>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
});

const EventModel = mongoose.model<Event>("IEvent", eventSchema);

export { EventModel };
