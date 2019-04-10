// Get references to page elements
var $recipeText = $("#recipe-text");
// var $recipeOption = $("#recipe-option").val();
var $submitBtn = $("#submit");
var $recipeList = $("#recipe-list");
var $ingredientText = $("#ingredient-text");
var $submitIngredient = $("#submit-ingredient");
var $recipeId = $("#recpID");

// The API object contains methods for each kind of request we'll make
var API = {
  saveRecipe: function(recipe) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/recipes",
      data: JSON.stringify(recipe)
    });
  },
  saveIngredient: function(ingredient, id) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/recipes/" + id,
      data: JSON.stringify(ingredient)
    });
  },
  getRecipes: function() {
    return $.ajax({
      url: "api/recipes",
      type: "GET"
    });
  },
  getIngredients: function() {
    return $.ajax({
      url: "api/ingredients",
      type: "GET"
    });
  },
  // getRecipeIngredients: function() {
  //   return $.ajax({
  //     url: "api/recipes/:recipeID/ingredients",
  //     type: "GET"
  //   });
  // },
  deleteRecipe: function(id) {
    return $.ajax({
      url: "api/recipes/" + id,
      type: "DELETE"
    });
  }
};

// Wondering if this should just be another "GET" ?? Seems like we are going to a strange address here...
// refreshRecipes gets new examples from the db and repopulates the list
var refreshRecipes = function() {
  API.getRecipes().then(function(data) {
    var $recipes = data.map(function(recipe) {
      var $a = $("<a>")
        .text(recipe.recipeName)
        .attr("href", "/recipe/" + recipe.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": recipe.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $recipeList.empty();
    $recipeList.append($recipes);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var recipe = {
    recipeName: $recipeText.val().trim()
  };

  if (!recipe.recipeName) {
    alert("You must enter an recipe!");
    return;
  }
  console.log(recipe);
  API.saveRecipe(recipe).then(function() {
    refreshRecipes();
  });

  $recipeText.val("");
  // $recipeOption.val("");
};

var handleIngredientSubmit = function(event) {
  event.preventDefault();

  var ingredient = {
    ingredient: $ingredientText.val().trim()
  };

  if (!ingredient.ingredient) {
    alert("You must enter an ingredient!");
    return;
  }
  console.log(ingredient);
  API.saveIngredient(ingredient, $recipeId.text().trim()).then(function() {
    refreshRecipes();
  });

  $recipeText.val("");
  // $recipeOption.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteRecipe(idToDelete).then(function() {
    refreshRecipes();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$submitIngredient.on("click", handleIngredientSubmit);
$recipeList.on("click", ".delete", handleDeleteBtnClick);
