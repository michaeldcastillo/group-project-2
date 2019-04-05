module.exports = function(sequelize, DataTypes) {
  var Ingredient = sequelize.define("Recipes", {
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    }
  });

  Ingredient.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Ingredient.hasMany(models.Recipe, {
      onDelete: "cascade"
    });
  };

  return Ingredient;
};
