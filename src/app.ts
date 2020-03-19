import express from 'express'
import morgan from 'morgan';
import path from 'path';
import exphbs from 'express-handlebars';
import * as helpers from './libs/handlebars';
import passport from 'passport'
import session from 'express-session'
import flash from 'connect-flash';

import './config/passport'

// Routes
import indexRoutes from './routes/index.routes'
import notesRoutes from './routes/notes.routes'
import usersRoutes from './routes/users.routes'

// Initializations
const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
  secret: 'somesecretkey',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  res.locals.user = req.user;
  next();
});

// Routes
app.use(indexRoutes);
app.use('/notes', notesRoutes);
app.use('/users', usersRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

export default app;