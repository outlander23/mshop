import { login, signin } from "../controllers/auth.controller.js";
import { Router } from "express";

const authRouter = Router();

authRouter.route("/login").post(login);
authRouter.route("/signin").post(signin);

export default authRouter;
