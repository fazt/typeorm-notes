import passport from "passport";
import { Strategy } from "passport-local";

import { User } from "../entity/User";
import { getRepository } from "typeorm";

passport.use(
  "signup",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    async (username, password, done) => {
      // Math User's Email
      const userFound = await getRepository(User).findOne({ username });
      if (userFound) {
        return done(null, false, { message: "The Username is already Taken" });
      } else {
        const newUser = new User();
        newUser.username = username;
        newUser.password = password;
        const userSaved = await getRepository(User).save(newUser);
        return done(null, userSaved);
      }
    }
  )
);

passport.use(
  "signin",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    async (username, password, done) => {
      // Math User's Email
      const userFound = await getRepository(User).findOne({ username });
      if (!userFound) {
        return done(null, false, { message: "The Username doesn't exists" });
      } else {
        const matchPassword = await userFound.comparePassword(password);
        if (matchPassword) {
          return done(null, userFound);
        }
        return done(null, false, { message: "Incorrect Password" });
      }
    }
  )
);
passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await getRepository(User).findOne(id);
    if (user) {
      return done(null, {username: user.username, id: user.id });
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});
