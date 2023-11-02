import { Request, Response } from "express";
import User from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send({ message: err.message });
    } else {
      res.status(400).send({ message: "An unknown error occurred." });
    }
  }
};

export const listUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ message: err.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred." });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    res.status(200).send(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ message: err.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred." });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).send({ message: "User not found" });
    res.status(200).send(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ message: err.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred." });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    res.status(200).send({ message: "User deleted" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ message: err.message });
    } else {
      res.status(500).send({ message: "An unknown error occurred." });
    }
  }
};
