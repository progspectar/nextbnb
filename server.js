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
const passport = require('passport');
const LocalStrategy = require('passport-local');

const optionsLocalStrategy = {
  usernameField: 'email',
  passwordField: 'password',
};

// const clb = async (email, password, done) => {
//   if (!email || !password) {
//     done('Email and password required', null);
//     return;
//   }
//   const user = await User.findOne({ where: { email: email } });

//   if (!user) {
//     done('User not found', null);
//     return;
//   }

//   const valid = await user.isPasswordValid(password);

//   if (!valid) {
//     done('Email and password do not match', null);
//     return;
//   }

//   done(null, user);
// };

passport.use(
  new LocalStrategy(
    optionsLocalStrategy,
    async function (email, password, done) {
      if (!email || !password) {
        done('Email and password required', null);
        return;
      }

      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        done('User not found', null);
        return;
      }

      const valid = await user.isPasswordValid(password);

      if (!valid) {
        done('Email and password do not match', null);
        return;
      }

      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});
passport.deserializeUser((email, done) => {
  User.findOne({ where: { email: email } }).then((user) => {
    done(null, user);
  });
});

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
    }),
    passport.initialize(),
    passport.session()
  );

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;

    console.log(`App is running on http://localhost:${port}`);
  });
});
