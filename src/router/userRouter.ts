import express from "express";
import User, { IUser } from "../models/User";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
});

router.post("/", async (req, res) => {
  const user: IUser = new User({
    name: req.body.name,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred." });
    }
  }
});

router.patch("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;

  try {
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred." });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
});

export default router;
