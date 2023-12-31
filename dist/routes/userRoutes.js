"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.post("/", userController_1.createUser);
exports.userRoutes.get("/", userController_1.listUsers);
exports.userRoutes.get("/:id", userController_1.getUser);
exports.userRoutes.put("/:id", userController_1.updateUser);
exports.userRoutes.delete("/:id", userController_1.deleteUser);
