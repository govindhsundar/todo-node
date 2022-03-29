const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const {
  getAllTodoList,
  getTodoListBySlug,
  createTodoList,
  updateTodoListById,
  deleteTodoListById
} = require('./controllers/todoList');

const {
  getAllTodo,
  createTodo,
  updateTodoById,
  deleteTodoById,
} = require('./controllers/todo');

const app = express();
const port = 8000;

app.use(cors())
app.use(bodyParser.json());

app.get('/list/', getAllTodoList);
app.post('/list/', createTodoList);
app.get('/list/:slug', getTodoListBySlug);
app.put('/list/:id', updateTodoListById);
app.delete('/list/:id', deleteTodoListById);

app.get('/todo/:todoListId', getAllTodo);
app.post('/todo/', createTodo);
app.put('/todo/:id', updateTodoById);
app.delete('/todo/:id', deleteTodoById);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
