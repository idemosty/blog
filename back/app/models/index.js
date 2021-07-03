const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const { methodOf } = require("lodash");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// Initliazie database module
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tips = require("./tip.model.js")(sequelize, Sequelize);

module.exports = db;