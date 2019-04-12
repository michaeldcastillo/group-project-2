/* eslint-disable quotes */
// Get references to page elements
var $recipeText = $("#recipe-text");
// var $recipeOption = $("#recipe-option").val(); // didn't get around to this functionality...
var $submitBtn = $("#submit");
var $recipeList = $("#recipe-list");
var $ingredientText = $("#ingredient-text");
var $submitIngredient = $("#submit-ingredient");
var $recipeId = $("#recpID");
var $ingredientList = $("#ingredient-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveRecipe: function(recipe) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/recipes",
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
      url: "/api/recipes",
      type: "GET"
    });
  },
  getIngredients: function() {
    return $.ajax({
      url: "/api/ingredients",
      type: "GET"
    });
  },

  getRecipeIngredients: function(recipeid) {
    return $.ajax({
      url: "/api/recipes/" + recipeid,
      type: "GET"
    });
  },

  deleteRecipe: function(id) {
    return $.ajax({
      url: "/api/recipes/" + id,
      type: "DELETE"
    });
  },

  updateList: function(newState, buttonID) {
    return $.ajax({
      //   url: "/api/ingredients/" + buttonID,
      //   type: "PUT"
      // });
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/ingredients/" + buttonID,
      type: "PUT",
      data: JSON.stringify(newState)
    });
  }
};

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

// refreshRecipes gets new examples from the db and repopulates the list
var refreshIngredients = function() {
  // location.reload();
  var recipeid = $recipeId.text().trim();
  API.getRecipeIngredients(recipeid).then(function(data) {
    var $recpIngredients = data[0].Ingredients.map(function(recpIngs) {
      var $p = $("<p>").text(recpIngs.ingredient);

      var $li = $("<li>")
        .attr({
          class: "list-group-item"
        })
        .append($p);

      if (recpIngs.onList === true) {
        var btnClasses = "btn btn-success float-right onList";
        var checkClasses = "far fa-check-square";

        // eslint-disable
        var $button = $(
          // eslint-disable-next-line quotes
          '<button data-id="' +
            recpIngs.id +
            '" data-state="' +
            recpIngs.onList +
            '" class="' +
            btnClasses +
            '"><i class="' +
            checkClasses +
            '"></i></button>'
        );
        //eslint-enable
      } else {
        var btnClasses = "btn btn-secondary float-right onList";
        var checkClasses = "far fa-square";

        // eslint-disable
        var $button = $(
          '<button data-id="' +
            recpIngs.id +
            '" data-state="' +
            recpIngs.onList +
            '" class="' +
            btnClasses +
            '"><i class="' +
            checkClasses +
            '"></i></button>'
        );
      }

      $li.append($button);

      return $li;
    });

    $ingredientList.empty();
    $ingredientList.append($recpIngredients);
    bindCheckboxClickHanders(refreshIngredients);
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

var refreshShoppingList = function() {
  console.log("here is where we referesh!");
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
    refreshIngredients();
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

function bindCheckboxClickHanders(refreshFunction) {
  $(".btn.onList").on("click", function() {
    console.log("button clicked");
    // var state = $(this).attr("list-status");
    var buttonID = $(this).attr("data-id");
    console.log(buttonID);
    console.log($(this).attr("data-state"));
    if ($(this).attr("data-state") === "false") {
      console.log("changing false to true");
      var newState = {
        onList: true
      };
      // $(this).attr("data-state", "true");
      API.updateList(newState, buttonID).then(function() {
        refreshFunction();
      });
    } else {
      console.log("changing true to false");
      var newState = {
        onList: false
      };
      // $(this).attr("data-state", "false");
      API.updateList(newState, buttonID).then(function() {
        refreshFunction();
      });
    }
  });
}

bindCheckboxClickHanders(refreshIngredients);
