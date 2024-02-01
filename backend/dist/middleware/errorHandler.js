"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = ({ err, req, res, next }) => {
    const statusCode = err.statusCode || 500;
    const error = err instanceof Error ? err : new Error(String(err));
    console.log(`Error on ${req.method} ${req.url}`, error.stack);
    return res === null || res === void 0 ? void 0 : res.status(statusCode).send({
        error: error.message || "Unknown error",
        meta: Object.assign({}, error),
    });
};
exports.errorHandler = errorHandler;
exports.default = { errorHandler: exports.errorHandler };
//# sourceMappingURL=errorHandler.js.map