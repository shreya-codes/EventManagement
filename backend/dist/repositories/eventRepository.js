"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEvent = exports.getEventById = exports.insertEvent = void 0;
const Event_model_1 = require("../models/Event.model");
const insertEvent = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
    const event = new Event_model_1.EventModel(Object.assign({}, eventData));
    yield event.save();
    return event;
});
exports.insertEvent = insertEvent;
const getEventById = (eventId) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getEventById = getEventById;
const removeEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const removedEvent = yield Event_model_1.EventModel.findOneAndUpdate({ _id: id, deleted: { $ne: true } }, { $set: { deleted: true, deletedAt: new Date() } }, { runValidators: true, new: true });
    console.log(removeEvent, "remo");
    if (!removedEvent) {
        throw new Error(`error while deleting event ${id}`);
    }
    return removedEvent;
});
exports.removeEvent = removeEvent;
//# sourceMappingURL=eventRepository.js.map