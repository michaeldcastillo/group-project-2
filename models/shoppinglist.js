module.exports = function(sequelize, DataTypes) {
  var List = sequelize.define("Example", {
    onList: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    }
  });
  return List;
};

// db.comments.belongsTo(db.posts);
// db.posts.hasMany(db.comments);
// db.posts.belongsTo(db.users);
// db.users.hasMany(db.posts);
