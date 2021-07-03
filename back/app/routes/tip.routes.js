module.exports = app => {
  // set the corresponding method when getting different route/request
  const tips = require("../controllers/tip.controller.js");
  // init router
  let router = require("express").Router();

  // Create a new Tip
  router.post("/", tips.create);

  // Retrieve all Tips
  router.get("/", tips.findAll);

  // Retrieve all published Tips
  router.get("/published", tips.findAllPublished);

  // Retrieve a single Tip with id
  router.get("/:id", tips.findOne);

  // Update a Tip with id
  router.put("/:id", tips.update);

  // Delete a Tip with id
  router.delete("/:id", tips.delete);

  // Create a new Tip
  router.delete("/", tips.deleteAll);

  app.use('/api/tips', router);
};