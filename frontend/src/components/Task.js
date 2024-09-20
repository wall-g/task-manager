import React from 'react'

function Task({taskDetails, provided}) {
  return (
    <div className='bg-blue-200 mt-4 mb-4 p-4 rounded-md' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        <h1>{taskDetails.title}</h1>
        <p>{taskDetails.description}</p>
        <p>Created at: {taskDetails.createdOn}</p>
        {provided.placeholder}
    </div>
  )
}

export default Task