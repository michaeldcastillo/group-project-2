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
      allowNull: false,
      set: function(value) {
        if (value === "true") {
          value = true;
        }
        if (value === "false") {
          value = false;
        }
        this.setDataValue("toMake", value);
      }
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  });
  return Recipe;
};
