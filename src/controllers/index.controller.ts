import {Request, Response} from 'express'

export const renderIndex = (req: Request, res: Response): void => {
  res.render('index');
};

export const renderAbout = (req: Request, res: Response): void => {
  res.render('about');
};


