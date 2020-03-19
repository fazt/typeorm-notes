import { Router } from "express";
const router = Router();

import {
  renderSignup,
  signup,
  renderProfile,
  renderSignin,
  signin,
  logout
} from "../controllers/users.controller";

router.get("/signup", renderSignup);

router.post("/signup", signup);

router.get("/profile", renderProfile);

router.get("/signin", renderSignin);

router.post('/signin', signin);

router.get('/logout', logout);

export default router;
