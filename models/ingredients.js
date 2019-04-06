module.exports = function(sequelize, DataTypes) {
  var Ingredient = sequelize.define("Ingredient", {
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    createdAt: {
      type: DataTypes.DATE
      //   allowNull: false
    },
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  });

  return Ingredient;
};
