module.exports = function(sequelize, DataTypes) {
  var Ingredient = sequelize.define("Ingredient", {
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    onList: {
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
        this.setDataValue("onList", value);
      }
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  });

  return Ingredient;
};
