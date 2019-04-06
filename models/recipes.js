module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    toMake: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE
      //   allowNull: false
    },
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  });

  //   Recipe.associate = function(models) {
  //     // Associating Author with Posts
  //     // When an Author is deleted, also delete any associated Posts
  //     Recipe.hasMany(models.db.Ingredient, {
  //       onDelete: "cascade"
  //     });
  //   };

  return Recipe;
};
