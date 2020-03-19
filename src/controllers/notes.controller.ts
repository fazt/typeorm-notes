import { Request, Response } from "express";
import { Note } from "../entity/Note";
import { User } from "../entity/User";
import { getRepository } from "typeorm";

export const getNotes = async (req: Request, res: Response): Promise<void> => {
  if (req.user) {
    console.log(res.locals.user)
    const notes = await getRepository(Note).find({
      where: {user: req.user}
    });
    return res.render("notes/list", { notes });
  }
  return res.redirect("/users/signin");
};

export const renderCreateNote = (req: Request, res: Response): void => {
  res.render("notes/create");
};

export const createNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (req.user) {
    const userFound = await getRepository(User).findOne(req.user);
    if (userFound) {
      const note = new Note();
      note.title = req.body.title;
      note.description = req.body.description;
      note.user = userFound;

      await getRepository(Note).save(note);
      return res.redirect("/notes");
    }
  }
  return res.redirect("/users/signin");
};

export const renderEditNote = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  const noteFound = await getRepository(Note).findOne(req.params.noteId);
  if (noteFound) {
    return res.render("notes/edit", {
      noteFound
    });
  }
  return res.send("404 Note not found");
};

export const updateEdit = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  const noteFound = await getRepository(Note).findOne(req.params.noteId);
  if (noteFound) {
    noteFound.title = req.body.title;
    noteFound.description = req.body.description;
    await getRepository(Note).save(noteFound);
    return res.redirect("/notes");
  }
  res.redirect("/notes");
};

export const deleteNote = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  const noteToDelete = await getRepository(Note).findOne(req.params.noteId);
  if (noteToDelete) {
    await getRepository(Note).remove(noteToDelete);
    return res.redirect("/notes");
  }
  return res.send("404 Note not found");
};
