const { ERROR_MSG } = require("../constants");
const { Todo, TodoList } = require("../model/db");

const getAllTodo = (req, res) => {
  const { todoListId } = req.params;
  Todo.findAll({
    where: {
      todoListId
    }
  },{
    include: TodoList
  })
    .then(todo => res.json(todo))
    .catch(err => res.json({
      success: false,
      err: ERROR_MSG.somthingWrong
    }));
}

const createTodo = (req, res) => {
  const { content, status, todoListId } = req.body;

  Todo.create({
    content: content || '',
    status,
    todoListId: todoListId
  })
    .then(todo => res.json(todo))
    .catch(err => res.json({
      success: false,
      err: ERROR_MSG.somthingWrong
    }));
}

const updateTodoById = (req, res) => {
  const { id } = req.params;
  const { content, status } = req.body;
  Todo.update({
    content,
    status,
  },{
    where: {
      id
    }
  })
    .then(todo => res.json(todo))
    .catch(err => res.json({
      success: false,
      err: ERROR_MSG.somthingWrong
    }));
}

const deleteTodoById = (req, res) => {
  const { id } = req.params;
  Todo.destroy({
    where: {
      id
    }
  })
    .then(() => res.json({success: true}))
    .catch(err => res.json({
      success: false,
      err: ERROR_MSG.somthingWrong
    }));
}

module.exports = {
  getAllTodo,
  createTodo,
  updateTodoById,
  deleteTodoById,
}