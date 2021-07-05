module.exports = (sequelize, Sequelize) => {
  const Tip = sequelize.define('tip', {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  })

  return Tip
}
//This Sequelize Model represents tips table in PostgreSQL database.
//These columns will be generated automatically: id, title, description, published, createdAt, updatedAt.
