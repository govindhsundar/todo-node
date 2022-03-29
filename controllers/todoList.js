const { ERROR_MSG } = require('../constants');
const { TodoList, Todo } = require('../model/db');
const { createSlug } = require('../utils');

const createUniqueSlug = async () => {
  const slug = createSlug();
  const data = await TodoList.findOne(
    {
      where: {
        slug
      }
    }
  );
  if(data){
    return await createUniqueSlug();
  }
  return slug;
};

const getAllTodoList = async (req, res) => {
  TodoList.findAll({
    include: Todo
  })
    .then(allTodoList => res.json(allTodoList))
    .catch(err => res.json({
      success: false,
      err: ERROR_MSG.somthingWrong
    }));
};

const getTodoListBySlug = async (req, res) => {
  const { slug } = req.params;
  TodoList.findOne({
    where: {
      slug
    },
    include: Todo
  })
    .then(todo => res.json(todo))
    .catch(err => res.json({
      success: false,
      err: ERROR_MSG.notFound
    }));
};

const updateTodoListById = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  TodoList.update({
    title
  },{
    where: {
      id
    }
  })
    .then(() => 
      TodoList.findByPk(id)
        .then(updateTodolist =>res.json(updateTodolist))
        .catch(err => res.json({
          success: false,
          err: ERROR_MSG.somthingWrong
        }))
    )
    .catch(err => res.json({
      success: false,
      err: ERROR_MSG.somthingWrong
    }));
};

const deleteTodoListById = (req, res) => {
  const { id } = req.params;
  TodoList.destroy({
    where: {
      id
    }
  })
    .then(() => res.json({success: true}))
    .catch(err => res.json({
      success: false,
      err: ERROR_MSG.somthingWrong
    }));
};

const createTodoList = async (req, res) => {
  const { title } = req.body;
  const slug = await createUniqueSlug();
  TodoList.create({
    slug,
    title,
  })
  .then(createdTodoList => res.json(createdTodoList))
  .catch(err => res.json({
    success: false,
    err: ERROR_MSG.notFound
  }));
};

module.exports = {
  getAllTodoList,
  getTodoListBySlug,
  createTodoList,
  updateTodoListById,
  deleteTodoListById,
};
