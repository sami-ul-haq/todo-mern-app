import { Router } from "express";
import { userLogin, userRegistration } from "../controllers/auth.controller.js";

const router = Router();


router.route("/register").post(userRegistration);

router.route("/login").post(userLogin);


export default router;