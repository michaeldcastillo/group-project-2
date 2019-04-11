/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function (app) {


  ///////////// GET ///////////////
  

  // Get All Recipes
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
 
  // Get all ingredients where "onList" is true
  app.get("/api/shoppinglist", function (req, res) {
    // recipeID = req.params.recipeID;
    db.Ingredient.findAll({
      // include: [{
      //   model: db.Recipe,
      //   through: {
      //     attributes: ["RecipeId", "IngredientId"],
      where: {onList: true}
      //   }
      // }]
    }).then(function (dbRecipe) {
      res.json(dbRecipe);
    });
  });


  ////////////// POST ////////////////

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



  ///////////// UPDATE ///////////

  // Change ingredient "onList" true or false
  app.put("/api/ingredients/:ingredientID", function (req, res) {
    db.Ingredient.update({onList: req.body.onList}, { where: { id: req.params.ingredientID} }).then(function (onListUpdate) {
      res.json(onListUpdate);
    });
  });

  // Change recipe "toMake" true or false
  app.put("/api/recipes/:recipeID", function (req, res) {
    db.Recipe.update({toMake: req.body.toMake}, { where: { id: req.params.recipeID} }).then(function (toMakeUpdate) {
      res.json(toMakeUpdate);
    });
  });

  // Change recipe name
  app.put("/api/recipes/:recipeID", function (req, res) {
    db.Recipe.update({recipeName: req.body.recipeName}, { where: { id: req.params.recipeID} }).then(function (recipeUpdate) {
      res.json(recipeUpdate);
    });
  });

  // Change ingredient name ??
  // app.put("/api/ingredients/:ingredientID", function (req, res) {
  //   db.Ingredient.update({ingredient: req.body.ingredient}, { where: { id: req.params.ingredientID} }).then(function (ingredientUpdate) {
  //     res.json(ingredientUpdate);
  //   });
  // });



  ///////// DELETE /////////

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


   
/////////// OLD STUFF ///////////
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
 