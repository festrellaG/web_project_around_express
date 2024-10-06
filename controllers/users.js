import User from "../models/user.js";
import { HttpStatus } from "../enums/http.js";
import { createCardExport } from "../app.js";

export async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(HttpStatus.OK).send(users);
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
}

export async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findById(id).orFail();
    res.status(HttpStatus.OK).send(user);
  } catch (error) {
    console.error(error);
    console.log("error name: ", error.name);
    if (error.name === "DocumentNotFoundError") {
      res.status(HttpStatus.NOT_FOUND).send({ message: "User not found" });
    } else {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
}

export async function createUser(req, res) {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    res.status(HttpStatus.CREATED).send(newUser);
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.BAD_REQUEST).send({ message: error.message });
  }
}

export async function updateProfile(req, res) {
  const { name, about } = req.body;
  //const id = se debe sustituir por el id de params "req.params.id"
  const id = createCardExport(req, res);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true }
    ).orFail();

    res.status(HttpStatus.OK).send(updatedUser);
  } catch (error) {
    console.error(error);
    if (error.name === "DocumentNotFoundError") {
      res.status(HttpStatus.NOT_FOUND).send({ message: "User not found" });
    } else {
      res.status(HttpStatus.BAD_REQUEST).send({ message: error.message });
    }
  }
}

export async function updateAvatar(req, res) {
  const { avatar } = req.body;
  //const id = se debe sustituir por el id de params "req.params.id"
  const id = createCardExport(req, res);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true }
    ).orFail();

    res.status(HttpStatus.OK).send(updatedUser);
  } catch (error) {
    console.error(error);
    if (error.name === "DocumentNotFoundError") {
      res.status(HttpStatus.NOT_FOUND).send({ message: "User not found" });
    } else {
      res.status(HttpStatus.BAD_REQUEST).send({ message: error.message });
    }
  }
}
