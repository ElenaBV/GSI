require('dotenv').config();
require('@babel/register');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);

const main = require('./routers/mainRouter');
const game = require('./routers/game.router');
// const log = require('./routers/login.router');
// const reg = require('./routers/registration.router');
// const logout = require('./routers/logout.router');

const { PORT, SECRET_KEY_SESSION } = process.env;

const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
};

const sessionConfig = {
  store: new FileStore(),
  secret: SECRET_KEY_SESSION,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 9999999999999,
    httpOnly: true,
  },
};

const app = express();
app.use(cors(corsOptions));
app.use(expressSession(sessionConfig));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', main);
app.use('/game', game);
app.use('/game', game);

// app.use('/log', log);
// app.use('/reg', reg);
// app.use('/logout', logout);

app.listen(PORT, () => {
  console.log(`Поехали на порту - ${PORT}`);
});
