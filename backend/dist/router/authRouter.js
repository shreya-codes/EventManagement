"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
// import { createAccount, login } from '../controllers/authController.js';
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post("/signup");
authRouter.post("/login");
//# sourceMappingURL=authRouter.js.map