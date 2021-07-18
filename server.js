const express = require('express');
const next = require('next');
const session = require('express-session');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const User = require('./model').User;
const sequelize = require('./model').sequelize;
const sessionStore = new SequelizeStore({ db: sequelize });

// sessionStore.sync();
nextApp.prepare().then(() => {
  const server = express();
  server.use(
    session({
      secret: '123',
      resave: false,
      saveUninitialized: true,
      name: 'nextbnb',
      cookie: { secure: false, maxAge: 30 * 24 * 3600 * 1000 },
      store: sessionStore,
    })
  );

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;

    console.log(`App is running on http://localhost:${port}`);
  });
});
