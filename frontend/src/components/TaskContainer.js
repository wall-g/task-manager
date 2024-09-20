import React from 'react'
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd';

function TaskContainer({ type, tasks }) {
  return (
    <Droppable droppableId={type}>
      {
        (provided) => (
          <div className='bg-secondary rounded-md p-4 shadow-md' {...provided.droppableProps} ref={provided.innerRef}>
            <p>{type.toUpperCase()}</p>
            {
              tasks.map((task, index) => {
                return (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {
                      (provided) => (
                         <Task  taskDetails={task} provided={provided}/> 
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