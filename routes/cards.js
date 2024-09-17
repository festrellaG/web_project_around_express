import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/cards.json");

router.get("/", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const cards = data.toString("utf8");
    const card = JSON.parse(cards);
    res.send(card);
  });
});

export default router;
