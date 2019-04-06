/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function (app) {
  // Get All Meals - front end can display all in dropdown, 
  // and only toMake=true in a display div
  app.get("/api/recipes", function (req, res) {
    db.Recipe.findAll({}).then(function (dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // Create a new Recipe
  app.post("/api/recipes", function (req, res) {
    db.Recipe.create(req.body).then(function (dbNewMeal) {
      res.json(dbNewMeal);
    });
  });

  // // Create a new Ingredient - insert into Ingredient Table
  // app.post("/api/ingredients", function (req, res) {
  //   db.Ingredient.create(req.body).then(function (NewIngredient) {
  //     res.json(NewIngredient);
  //   });
  // });

  // add ingredient to recipe
  app.post("/api/recipes/:recipeID/ingredients/:ingredient", function (req, res) {
    db.Ingredient.create(req.body).then(function (NewIngredient) {
      // res.json(NewIngredient);
      db.Recipe.findByPk(req.params.recipeID)
        .then(function (recipe) {
          recipe.setIngredients([NewIngredient.ingredientID]).then(function () {
            res.json(NewIngredient);
          });
        });
    });
  });
      

  // Create a new Ingredient - insert into Ingredient Table
  // app.post("/api/ingredients", function (req, res) {
  //   db.Ingredient.create(req.body).then(function (NewIngredient) {
  //     res.json(NewIngredient);
  //   });
  // });

  // add ingredient to recipe
  // app.post("/api/recipes/:recipeID/ingredients/:ingredientID", function (req, res) {
  //   db.Recipe.findByPk(req.params.recipeID)
  //     .then(function (recipe) {
  //       recipe.setIngredients([req.params.ingredientID]).then(function () {
  //         res.json({});
  //       });
  //     });
  // });

  // add ingredient to recipe
 


  // Delete a Recipe by id -- THIS WILL DELETE FROM DATABASE -- 
  // Front end should make two buttons - one is to deselect from menu plan, 
  // the other is to DELETE recipe completely
  app.delete("/api/recipes/:recipeID", function (req, res) {
    db.Recipe.destroy({ where: { id: req.params.recipeID } }).then(function (dbDelete) {
      res.json(dbDelete);
    });
  });

  app.delete("/api/ingredients/:ingredientID", function (req, res) {
    db.Ingredient.destroy({ where: { id: req.params.ingredientID } }).then(function (dbDelete) {
      res.json(dbDelete);
    });
  });
};


   
