module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipes", {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    toMake: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true
    }
  });

  Recipe.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Recipe.hasMany(models.Ingredient, {
      onDelete: "cascade"
    });
  };

  return Recipe;
};
