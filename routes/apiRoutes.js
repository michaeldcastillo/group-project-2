/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function (app) {


  ///////////// GETS ///////////////
  

  // Get All Meals - front end can display all in dropdown, 
  // and only toMake=true in a display div
  app.get("/api/recipes", function (req, res) {
    db.Recipe.findAll({}).then(function (dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // Get All Ingredients
  app.get("/api/ingredients", function (req, res) {
    db.Ingredient.findAll({}).then(function (dbIngredient) {
      res.json(dbIngredient);
    });
  });


  // Get all ingredients per a recipe
  app.get("/api/recipes/:recipeID", function (req, res) {
    // recipeID = req.params.recipeID;
    db.Recipe.findAll({
      where: {id: req.params.recipeID},
      include: [{
        model: db.Ingredient,
        through: {
          attributes: ["RecipeId", "IngredientId", "ingredient"]
        }
      }]
    }).then(function (dbRecipe) {
      //does this work, or do I need to pull more info from List table here??
      res.json(dbRecipe);
    });
  });
 


  ////////////// POSTS ////////////////

  // Create a new Recipe
  app.post("/api/recipes", function (req, res) {
    db.Recipe.create(req.body).then(function (dbNewMeal) {
      res.json(dbNewMeal);
    });
  });

  // add ingredient to recipe
  app.post("/api/recipes/:recipeID", function (req, res) {
    var ingredient = req.body.ingredient.toLowerCase();
    // console.log(ingredient);
    db.Ingredient.findOne({ where: {ingredient: ingredient } }).then(function(response) {
      console.log("Hi");
      if (response) {
        var ingredientID = response.id;
        console.log(ingredientID);
        db.Recipe.findOne({ where: { id: req.params.recipeID } })
          .then(function (recipe) {
            recipe.addIngredients([ingredientID]).then(function () {
              res.json("Linked ingredient to recipe.");
            });
          });
      } else {
        // console.log(ingredient);
        db.Ingredient.create({ingredient: ingredient}).then(function (newIngredient) {
          // console.log(newIngredient);
          db.Recipe.findOne({ where: { id: req.params.recipeID } })
            .then(function (recipe) {
              recipe.addIngredients([newIngredient.id]).then(function () {
                res.json(newIngredient);
              });
            });
        });
      }
    });
  });

  // app.post("/api/recipes/:recipeID", function (req, res) {
  //   db.Ingredient.create(req.body).then(function (newIngredient) {
  //     // res.json(NewIngredient);
  //     // req.params.ingredient = NewIngredient.ingredient;
  //     console.log(newIngredient.id);
  //     // db.List.create({ RecipeId: req.params.recipeID, IngredientID: newIngredient.id } )
  //     //   .then(function () {
  //     //     res.json(newIngredient);
  //     //   });
  //   });
  // });
      

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


   
