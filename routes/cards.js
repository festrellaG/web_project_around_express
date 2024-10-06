import express from "express";
import {
  getCards,
  createCard,
  deleteCardById,
  cardLikes,
  cardDislikes,
} from "../controllers/cards.js";

const router = express.Router();

router.get("/", getCards);

router.post("/", createCard);

router.delete("/:id", deleteCardById);

router.put("/:cardId/likes", cardLikes);

router.delete("/:cardId/likes", cardDislikes);

export default router;
