import express from 'express';
import { addTodo } from '../controller/todo.js';
import { getAllTodos } from '../controller/todo.js';
import { updateTodo } from '../controller/todo.js';
const router = express.Router();

router.post('/addTodo', addTodo);
router.get('/todos', getAllTodos);
router.put('/updateTodo/:id', updateTodo);

export default router;