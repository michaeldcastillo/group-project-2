var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Recipe.findAll({}).then(function(dbRecipes) {
      res.render("index", {
        msg: "What's Cookin'!",
        recipes: dbRecipes
      });
    });
  });

  // Load recipe page and pass in an recipe by id
  app.get("/recipe/:id", function(req, res) {
    db.Recipe.findOne({ where: { id: req.params.id } }).then(function(
      dbRecipe
    ) {
      res.render("recipe", {
        recipe: dbRecipe
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/recipe/:id", function(req, res) {
    db.Recipe.findOne({ where: { id: req.params.id } }).then(function(
      dbRecipe
    ) {
      res.render("recipe", {
        recipe: dbRecipe
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
