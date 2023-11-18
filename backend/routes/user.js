import { Router } from "express";
import { deleteUser, getAllUsers, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/").get(getAllUsers);

router.route("/:id").put(updateUser);

router.route("/:id").delete(deleteUser);

export default router; 


