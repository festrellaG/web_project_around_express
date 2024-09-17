import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/users.json");

router.get("/", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const users = JSON.parse(data.toString("utf8"));
    res.send(users);
  });
});

router.get("/:id", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const { id } = req.params;
    const users = JSON.parse(data.toString("utf8"));
    const user = users.find((user) => user._id === id);

    if (!user) {
      res.status(404).send({ error: "ID de usuario no encontrado" });
      return;
    }

    res.send(user);
  });
});

export default router;
