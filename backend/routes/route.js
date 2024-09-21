import express from 'express';
import { addTodo } from '../controller/todo-controller.js';
import { getAllTodos } from '../controller/todo-controller.js';
import { updateTodo } from '../controller/todo-controller.js';
import { loginUser } from '../controller/user-controller.js';
import { signupUser } from '../controller/user-controller.js';
import { getTodoById } from '../controller/todo-controller.js';
import { deleteTodoById } from '../controller/todo-controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);

router.post('/addTodo', addTodo);
router.get('/todos/:id', getAllTodos);
router.get('/todo/:id', getTodoById)
router.put('/updateTodo/:id', updateTodo);
router.delete('/deleteTodo/:id', deleteTodoById)

export default router;