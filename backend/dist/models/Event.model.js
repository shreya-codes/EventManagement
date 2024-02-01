"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const eventSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
});
const EventModel = mongoose_1.default.model("IEvent", eventSchema);
exports.EventModel = EventModel;
//# sourceMappingURL=Event.model.js.map