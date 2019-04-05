/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function(app) {
  // Get All Meals - front end can display all in dropdown, 
  // and only toMake=true in a display div
  app.get("/api/recipes", function(req, res) {
    db.Recipe.findAll({}).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // Create a new Recipe
  app.post("/api/recipes", function(req, res) {
    db.Recipe.create(req.body).then(function(dbNewMeal) {
      res.json(dbNewMeal);
    });
  });

  // Delete a Recipe by id -- THIS WILL DELETE FROM DATABASE -- 
  // Front end should make two buttons - one is to deselect from menu plan, 
  // the other is to DELETE recipe completely
  app.delete("/api/recipes/:id", function(req, res) {
    db.Recipe.destroy({ where: { id: req.params.id } }).then(function(
      dbDelete
    ) {
      res.json(dbDelete);
    });
  });
};
