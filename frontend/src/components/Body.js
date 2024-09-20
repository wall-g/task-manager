import React, { useEffect, useState } from 'react'
import TaskContainer from './TaskContainer'
import { taskContainerType } from '../utils/enums'
import { DragDropContext } from 'react-beautiful-dnd'
import { GET_TODOS } from '../utils/url.js'

function Body() {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        getTodos();
    }, []);

    async function getTodos() {
        const data = await fetch(GET_TODOS);
        const todos = await data.json();
        setTodos(todos);
    }

    async function updateTodo(item) {
        try {
            const data = await fetch(`http://localhost:4000/updateTodo/${item._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(item)
            })
        } catch (error) {
            console.log(error);
        }
    }

    const toDo = todos.filter((el) => el.type === taskContainerType.todo);
    const inProgress = todos.filter((el) => el.type === taskContainerType.inProgress);
    const done = todos.filter((el) => el.type === taskContainerType.done);

    const handleDrag = (result) => {
        const { destination, draggableId } = result;
        const draggableItem = todos.find((todo) => todo._id === draggableId);
        draggableItem.type = destination.droppableId;
        const items = todos.filter((todo) => todo._id !== draggableId);
        items.push(draggableItem);
        setTodos(items);
        updateTodo(draggableItem);
    }

    return (
        <DragDropContext onDragEnd={handleDrag}>
            <div className='w-4/5 m-auto mt-8'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mb-4">
                    Add Task
                </button>
                <div className='grid grid-cols-3 gap-4 min-h-screen mb-8'>
                    <TaskContainer type={taskContainerType.todo} tasks={toDo} />
                    <TaskContainer type={taskContainerType.inProgress} tasks={inProgress} />
                    <TaskContainer type={taskContainerType.done} tasks={done} />
                </div>
            </div>
        </DragDropContext>

    )
}

export default Body