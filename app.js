import express from "express";

import userRoutes from "./routes/users.js";
import cardRoutes from "./routes/cards.js";

const app = express();

app.use(express.json());

const { PORT = 3000 } = process.env;

app.use("/users", userRoutes);

app.use("/cards", cardRoutes);

app.use((req, res) => {
  res.status(404).send({ error: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
