import { Router } from "express";
const router = Router();

import {
  getNotes,
  createNote,
  renderCreateNote,
  deleteNote,
  renderEditNote,
  updateEdit
} from "../controllers/notes.controller";

import { isAuthenticated } from "../libs/passport";

router.use(isAuthenticated);

router.get("/", getNotes);

router.get("/create", renderCreateNote);

router.post("/create", createNote);

router.get("/edit/:noteId", renderEditNote);

router.post("/update/:noteId", updateEdit);

router.get("/delete/:noteId", deleteNote);

export default router;
