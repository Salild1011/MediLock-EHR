import { Router } from "express";
import { createUser, getUser } from "./user.controller";

const router = Router();

router.post("/", createUser);
router.get("/", getUser);

export default router;
