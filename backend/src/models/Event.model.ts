import mongoose from "mongoose";
import validator from "validator";
import { APIError } from "../error/error";
import { ErrorMap } from "../constants/error.constants";

export interface IEvent {
  _id: string;
  name: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  deleted?: boolean;
  deletedAt?: Date;
}

const eventSchema = new mongoose.Schema<IEvent>({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        if (!validator.isDate(value)) {
          throw new APIError(
            ErrorMap.ValidationError("Invalid date format for endDate")
          );
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
          if (!validator.isDate(value)) {
            throw new APIError(
              ErrorMap.ValidationError("Invalid date format for endDate")
            );
          }
        }
        if (!validator.isAfter(value.toISOString(), startDate?.toISOString())) {
          let error = ErrorMap.ValidationError(
            "Invalid date: End date should be after startDate"
          );
          throw error;
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
