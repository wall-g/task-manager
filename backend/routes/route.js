import express from 'express';
import { addTodo } from '../controller/todo-controller.js';
import { getAllTodos } from '../controller/todo-controller.js';
import { updateTodo } from '../controller/todo-controller.js';
import { loginUser } from '../controller/user-controller.js';
import { signupUser } from '../controller/user-controller.js';
import { getTodoById } from '../controller/todo-controller.js';
import { deleteTodoById } from '../controller/todo-controller.js';
import { googleLogin } from '../controller/user-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);

router.post('/addTodo', authenticateToken, addTodo);
router.get('/todos/:id', authenticateToken, getAllTodos);
router.get('/todo/:id', authenticateToken, getTodoById);
router.put('/updateTodo/:id', authenticateToken, updateTodo);
router.delete('/deleteTodo/:id', authenticateToken, deleteTodoById);

router.get('/auth/google', googleLogin);

export default router;