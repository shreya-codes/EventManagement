import mongoose from "mongoose";
import validator from "validator";

export interface IEvent {
  _id: string;
  name: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  deleted?: boolean;
  deletedAt?: Date;
}

const eventSchema = new mongoose.Schema<IEvent>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        console.log(validator.isDate(value));

        if (!validator.isDate(value)) {
          throw new Error("Invalid date format for startDate");
        }
      },
    },
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const startDate = this.get("startDate");

        if (!validator.isDate(value)) {
          throw new Error("Invalid date format for endDate");
        }
        if (!validator.isAfter(value.toISOString(), startDate?.toISOString())) {
          throw new Error("Invalid date: End date should be after startDate");
        }
      },
    },
  },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
});

const EventModel = mongoose.model<IEvent & mongoose.Document>(
  "IEvent",
  eventSchema
);

export { EventModel };
