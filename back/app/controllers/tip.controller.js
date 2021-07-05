const db = require('../models')
const Tip = db.tips
const Op = db.Sequelize.Op

// Create and Save a new Tip
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  // Create a Tip
  const tip = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  }

  // Save Tip in the database
  Tip.create(tip)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Tip.',
      })
    })
}

// Retrieve all Tips from the database
exports.findAll = (req, res) => {
  const title = req.query.title
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null

  Tip.findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tips.',
      })
    })
}

// Find a single Tip with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Tip.findByPk(id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Tip with id=' + id,
      })
      console.log(err)
    })
}

// Update a Tip by the id in the request
exports.update = (req, res) => {
  const id = req.params.id

  Tip.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Tip was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Tip with id=${id}. Maybe Tip was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Tip with id=' + id,
      })
      console.log(err)
    })
}

// Delete a Tip with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Tip.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Tip was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Tip with id=${id}. Maybe Tip was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Tip with id=' + id,
      })
      console.log(err)
    })
}

// Delete all Tips from the database
exports.deleteAll = (req, res) => {
  Tip.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tips were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all tips.',
      })
    })
}

// Find all published Tips
exports.findAllPublished = (req, res) => {
  Tip.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tips.',
      })
    })
}
