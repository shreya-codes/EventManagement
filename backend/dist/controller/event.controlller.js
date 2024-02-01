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
exports.deleteEvent = exports.updateEvent = exports.getEvent = exports.createEvent = void 0;
const eventRepository_1 = require("../repositories/eventRepository");
const createEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, location, startDate, endDate } = req.body;
        const createdEvent = yield (0, eventRepository_1.insertEvent)(req.body);
        return res.status(201).send(Object.assign({ success: true }, createdEvent));
    }
    catch (error) {
        return next(error);
    }
});
exports.createEvent = createEvent;
const deleteEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params, "-----------");
        const removedEvent = yield (0, eventRepository_1.removeEvent)(req.params.id);
        return res.status(204).send({ success: true });
    }
    catch (error) {
        return next(error);
    }
});
exports.deleteEvent = deleteEvent;
const updateEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedEvent = { eve: "update event" };
        return res.status(200).send(Object.assign({ success: true }, updatedEvent));
    }
    catch (error) {
        return next(error);
    }
});
exports.updateEvent = updateEvent;
const getEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = { eve: "create event" };
        return res.status(200).send(Object.assign({ success: true }, event));
    }
    catch (error) {
        return next(error);
    }
});
exports.getEvent = getEvent;
//# sourceMappingURL=event.controlller.js.map