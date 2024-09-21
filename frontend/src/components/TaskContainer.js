import React from 'react'
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd';

function TaskContainer({ type, tasks, setTodos }) {
  const todos = tasks.filter((task) => task.type === type);
  const deleteTodoById = (id) => {
    setTodos(tasks.filter((task) => task._id !== id));
  }

  return (
    <Droppable droppableId={type}>
      {
        (provided) => (
          <div className='bg-secondary rounded-md p-4 shadow-md' {...provided.droppableProps} ref={provided.innerRef}>
            <p>{type.toUpperCase()}</p>
            {
              todos.map((task, index) => {
                return (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {
                      (provided) => (
                         <Task  taskDetails={task} provided={provided} deleteTodoById={deleteTodoById}/> 
                      )
                    }
                  </Draggable>
                )
              })
            }
          </div>
        )
      }
    </Droppable>

  )
}

export default TaskContainer