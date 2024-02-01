import { type ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = ({ err, req, res, next }) => {
  const statusCode = err.statusCode || 500;
  const error = err instanceof Error ? err : new Error(String(err));
  console.log(`Error on ${req.method} ${req.url}`, error.stack);
  return res?.status(statusCode).send({
    error: error.message || "Unknown error",
    meta: { ...error },
  });
};

export default { errorHandler };
