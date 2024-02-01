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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const database = process.env.MONGODB_URI;
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    console.log(database);
    if (!database) {
        console.error("MONGODB_URI environment variable is not defined.", options);
        process.exit(1); // Exit the process or handle the error appropriately
    }
    try {
        yield mongoose_1.default.connect(database, options);
        console.log("Connected to database!\n");
    }
    catch (error) {
        console.error("Error connecting to database:", error);
    }
});
exports.default = connectToDatabase;
//# sourceMappingURL=database.js.map