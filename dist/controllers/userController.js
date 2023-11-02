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
exports.deleteUser = exports.updateUser = exports.getUser = exports.listUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new User_1.default(req.body);
        yield user.save();
        res.status(201).send(user);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).send({ message: err.message });
        }
        else {
            res.status(400).send({ message: "An unknown error occurred." });
        }
    }
});
exports.createUser = createUser;
const listUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.status(200).send(users);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send({ message: err.message });
        }
        else {
            res.status(500).send({ message: "An unknown error occurred." });
        }
    }
});
exports.listUsers = listUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user)
            return res.status(404).send({ message: "User not found" });
        res.status(200).send(user);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send({ message: err.message });
        }
        else {
            res.status(500).send({ message: "An unknown error occurred." });
        }
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!user)
            return res.status(404).send({ message: "User not found" });
        res.status(200).send(user);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send({ message: err.message });
        }
        else {
            res.status(500).send({ message: "An unknown error occurred." });
        }
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).send({ message: "User not found" });
        res.status(200).send({ message: "User deleted" });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send({ message: err.message });
        }
        else {
            res.status(500).send({ message: "An unknown error occurred." });
        }
    }
});
exports.deleteUser = deleteUser;
