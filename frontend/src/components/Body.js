import React, { useEffect, useState } from 'react'
import TaskContainer from './TaskContainer'
import { taskContainerType } from '../utils/enums'
import { DragDropContext } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'
import { getAccessTocken } from '../utils/common-utils'
import { GET_TODOS_URL } from '../utils/url'
import { UPDATE_TODO_URL } from '../utils/url'
import Loading from './Loading'


function Body() {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const accessToken = getAccessTocken();

    useEffect(() => {
        getTodos();
    }, []);

    async function getTodos() {
        if (accessToken) {
            const userId = JSON.parse(atob(accessToken.split(' ')[1].split('.')[1]))._id;
            setIsLoading(true);
            const data = await fetch(`${GET_TODOS_URL}/${userId}`, {
                method: 'GET',
                headers: {
                    authorization: accessToken,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            });
            setIsLoading(false);
            const todos = await data.json();
            setTodos(todos);
        }
    }

    async function updateTodo(item) {
        try {
            await fetch(`${UPDATE_TODO_URL}/${item._id}`, {
                method: 'PUT',
                headers: {
                    authorization: accessToken,
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(item)
            })
        } catch (error) {
            console.error(error);
        }
    }

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
        isLoading ?
            <Loading />
            :
            <DragDropContext onDragEnd={handleDrag}>
                <div className='w-4/5 m-auto mt-8'>
                    <div className='mb-8'>
                        <Link to='/addTodo' className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                            Add Task
                        </Link>
                    </div>
                    <div className='grid grid-cols-3 gap-4 min-h-screen mb-8'>
                        <TaskContainer type={taskContainerType.todo} tasks={todos} setTodos={setTodos} />
                        <TaskContainer type={taskContainerType.inProgress} tasks={todos} setTodos={setTodos} />
                        <TaskContainer type={taskContainerType.done} tasks={todos} setTodos={setTodos} />
                    </div>
                </div>
            </DragDropContext>

    )
}

export default Body