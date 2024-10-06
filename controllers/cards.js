import Card from "../models/card.js";
import { HttpStatus } from "../enums/http.js";
import { createCardExport } from "../app.js";

export async function createCard(req, res) {
  const { name, link } = req.body;
  const owner = createCardExport(req, res);

  try {
    const newCard = await Card.create({
      name,
      link,
      owner,
    });

    res.status(HttpStatus.CREATED).send(newCard);
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.BAD_REQUEST).send(error.message);
  }
}

export async function getCards(req, res) {
  try {
    const cards = await Card.find({}).populate("owner");
    res.status(HttpStatus.OK).send(cards);
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
}

export async function deleteCardById(req, res) {
  const { id } = req.params;

  try {
    const deletedCard = await Card.findByIdAndDelete(id);

    if (!deletedCard) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: "Card not found" });
    }

    res.status(HttpStatus.OK).send({ message: "Card deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
}

export async function cardLikes(req, res) {
  const { cardId } = req.params;
  const userId = createCardExport(req, res);

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true }
    ).orFail();

    res.status(HttpStatus.OK).send(updatedCard);
  } catch (error) {
    console.error(error);
    if (error.name === "DocumentNotFoundError") {
      res.status(HttpStatus.NOT_FOUND).send({ message: "Card not found" });
    } else {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
}

export async function cardDislikes(req, res) {
  const { cardId } = req.params;
  const userId = createCardExport(req, res);

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true }
    ).orFail();

    res.status(HttpStatus.OK).send(updatedCard);
  } catch (error) {
    console.error(error);
    if (error.name === "DocumentNotFoundError") {
      res.status(HttpStatus.NOT_FOUND).send({ message: "Card not found" });
    } else {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
}
