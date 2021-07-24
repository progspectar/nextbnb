const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const Model = Sequelize.Model;
const DataTypes = Sequelize.DataTypes;

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

sequelize.authenticate().then(
  () => {
    console.log('Connected to DB');
  },

  (err) => {
    console.log(`Error: ${err}`);
  }
);

class User extends Model {}

User.init(
  {
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'user',
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

User.prototype.isPasswordValid = async function (password) {
  return await bcrypt.compare(password, this.password);
};

exports.sequelize = sequelize;
exports.User = User;
