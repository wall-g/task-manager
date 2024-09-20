import todo from "../model/todo.js"

export const addTodo = async (request, response) => {
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
        let todos = await todo.find({});
        return response.status(200).json(todos);
    } catch (error) {
        return response.status(500).json({ msg: "error while getting todos" })
    }
}

export const updateTodo = async (request, response) => {
    try {
        const toDo = await todo.findById(request.params.id);
        if (!toDo) {
            return response.status(404).json({ msg: "todo not found" });
        }
        console.log(request.params.id, 'sfsdkfjhskdj');
        await todo.findByIdAndUpdate({ _id: request.params.id }, { $set: request.body });
        return response.status(200).json({ msg: "todo updated successfully" });
    } catch (error) {
        return response.status(500).json({ msg: "error while updating todo" })
    }
}