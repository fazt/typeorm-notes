import { Request, Response } from "express";
import { User } from "../entity/User";
import { getRepository } from "typeorm";

import passport from "passport";

export const renderSignup = (req: Request, res: Response): void => {
  res.render("users/signup");
};

export const renderProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (req.user) {
    const userFound = await getRepository(User).findOne(req.user);
    if (userFound) {
      return res.render("users/profile", { user: userFound });
    }
    return res.render("404");
  }
  return res.redirect("/users/signin");
};

export const renderSignin = (req: Request, res: Response): void => {
  res.render("users/signin");
};

export const signin = passport.authenticate("signin", {
  successRedirect: "/notes",
  failureRedirect: "/users/signin",
  failureFlash: true
});

export const signup = passport.authenticate("signup", {
  successRedirect: "/notes",
  failureRedirect: "/users/signup",
  failureFlash: true
});

export const logout = (req: Request, res: Response): void => {
  req.logout();
  res.redirect('/users/signin');
}