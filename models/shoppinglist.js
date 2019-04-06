module.exports = function(sequelize, DataTypes) {
  var List = sequelize.define("List", {
    onList: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  return List;
};
