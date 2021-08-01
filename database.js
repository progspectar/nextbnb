const Sequelize = require('sequelize');

const user = 'postgres';
const password = '123';
const host = 'localhost';
const database = 'nextbnb';
const port = 5433;

const sequelize = new Sequelize(database, user, password, {
  host: host,
  port: port,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
