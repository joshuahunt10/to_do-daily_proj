'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todos = sequelize.define('Todos', {
    task: DataTypes.STRING,
    completed: {type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Todos;
};
