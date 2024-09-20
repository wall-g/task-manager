import express from 'express';
import { addTodo } from '../controller/todo-controller.js';
import { getAllTodos } from '../controller/todo-controller.js';
import { updateTodo } from '../controller/todo-controller.js';
import { loginUser } from '../controller/user-controller.js';

const router = express.Router();

router.post('/login', loginUser);

router.post('/addTodo', addTodo);
router.get('/todos', getAllTodos);
router.put('/updateTodo/:id', updateTodo);

export default router;