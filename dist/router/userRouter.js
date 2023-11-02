"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.json(users);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred." });
        }
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.default({
        name: req.body.name,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
    });
    try {
        const newUser = yield user.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        }
        else {
            res.status(400).json({ message: "An unknown error occurred." });
        }
    }
}));
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.params.id);
    if (!user)
        return res.status(404).json({ message: "User not found" });
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
    try {
        const updatedUser = yield user.save();
        res.json(updatedUser);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        }
        else {
            res.status(400).json({ message: "An unknown error occurred." });
        }
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred." });
        }
    }
}));
exports.default = router;
