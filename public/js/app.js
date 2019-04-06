// Get references to page elements
var $recipeText = $("#recipe-text");
var $recipeOption = $("#recipe-option").val();
var $submitBtn = $("#submit");
var $recipeList = $("#recipe-list");

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
  getRecipes: function() {
    return $.ajax({
      url: "api/recipes",
      type: "GET"
    });
  },
  deleteRecipe: function(id) {
    return $.ajax({
      url: "api/recipes/" + id,
      type: "DELETE"
    });
  }
};

// refreshRecipes gets new examples from the db and repopulates the list
var refreshRecipes = function() {
  API.getRecipes().then(function(data) {
    var $recipes = data.map(function(recipe) {
      var $a = $("<a>")
        .text(recipe.text)
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
    text: $recipeText.val().trim()
  };

  if (!recipe.text) {
    alert("You must enter an recipe!");
    return;
  }

  API.saveRecipe(recipe).then(function() {
    refreshRecipes();
  });

  $recipeText.val("");
  $recipeOption.val("");
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
$recipeList.on("click", ".delete", handleDeleteBtnClick);
