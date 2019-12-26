import { Router } from "express";
import {
  validateLogin,
  loginController,
  validateSignup,
  signupController
} from "./auth.controller";

const router = Router();

router.post("/signup", [validateSignup], signupController);

router.post("/login", [validateLogin], loginController);

export default router;
