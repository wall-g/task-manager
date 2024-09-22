import todo from "../model/todo.js"
import { todoSchema } from "../utils/validation_schema.js";

export const addTodo = async (request, response) => {
    const { error } = todoSchema.validate(request.body);
    if (error) {
        return response.status(400).json({ msg: error.details[0].message });
    }
    try {
        const newTodo = new todo(request.body);
        await newTodo.save();
        return response.status(200).json({ msg: "todo added successfully" });
    } catch (error) {
        return response.status(500).json({ msg: "error while adding todo" })
    }
}

export const getAllTodos = async (request, response) => {
    try {
        let todos = await todo.find({userId: request.params.id});
        return response.status(200).json(todos);
    } catch (error) {
        return response.status(500).json({ msg: "error while getting todos" })
    }
}

export const updateTodo = async (request, response) => {
    const { error } = todoSchema.validate(request.body);
    if (error) {
        return response.status(400).json({ msg: error.details[0].message });
    }
    try {
        const toDo = await todo.findById(request.params.id);
        if (!toDo) {
            return response.status(404).json({ msg: "todo not found" });
        }
        await todo.findByIdAndUpdate({ _id: request.params.id }, { $set: request.body });
        return response.status(200).json({ msg: "todo updated successfully" });
    } catch (error) {
        return response.status(500).json({ msg: "error while updating todo" })
    }
}

export const getTodoById = async (request, response) => {
    try {
        const toDo = await todo.findById(request.params.id);
        if (!toDo) {
            return response.status(404).json({ msg: "todo not found" });
        }
        return response.status(200).json(toDo);
    } catch (error) {
        return response.status(500).json({ msg: "error while getting todo" })
    }
}

export const deleteTodoById = async (request, response) => {
    try {
        const toDo = await todo.findById(request.params.id);
        if (!toDo) {
            return response.status(404).json({ msg: "todo not found" });
        }
        await todo.findByIdAndDelete(request.params.id);
        return response.status(200).json({ msg: "todo deleted successfully" });
    } catch (error) {
        return response.status(500).json({ msg: "error while deleting todo" })
    }
}