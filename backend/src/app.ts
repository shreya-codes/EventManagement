import express from "express";
import "dotenv/config";
import connectToDatabase from "./config/database";
import { authRouter, eventRouter } from "./router";
import { errorHandler } from "./middleware";
// Now you can use authRouter and eventRouter in your code

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

connectToDatabase();

app.use((req, res, next) => {
  // log start of api call
  console.log(`Calling EventMangement API ${req.method} ${req.url}`, {
    body: req.body,
    query: req.query,
  });
  next();
});

// Routes
app.use("/events", eventRouter);
app.use("/auth", authRouter);

// Error Handling Middleware
// app.use(errorHandler);

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
