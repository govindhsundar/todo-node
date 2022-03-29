const { db } = require('../config');
const { Sequelize, DataTypes } = require('sequelize');

const { database, username, password, host } = db;
const sequelizeDb = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql'
});

const TodoList = sequelizeDb.define('todo-list', {
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING
    },
  });

  
const Todo = sequelizeDb.define('todo', {
  status: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.TEXT
  },
});

TodoList.hasMany(Todo, { foreignKey: 'todoListId' });
Todo.belongsTo(TodoList, { foreignKey: 'todoListId' });

TodoList.sync();
Todo.sync();

module.exports = {
  TodoList,
  Todo
}
