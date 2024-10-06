import express from "express";

import userRoutes from "./routes/users.js";
import cardRoutes from "./routes/cards.js";
import { HttpStatus } from "./enums/http.js";
import mongoose from "mongoose";

const app = express();

const { PORT = 3000 } = process.env;

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use((req, res, next) => {
  req.user = {
    _id: "67006763d8353280f36ee64b",
  };

  next();
});

app.use(express.json());
app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

app.use((req, res) => {
  res
    .status(HttpStatus.NOT_FOUND)
    .send({ error: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

export const createCardExport = (req, res) => {
  return req.user._id;
};
