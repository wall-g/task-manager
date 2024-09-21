import React, { useState } from 'react'
import ques from '../resources/ques.svg'
import { ADD_TODO_URL } from '../utils/url.js';
import { taskContainerType } from '../utils/enums.js';
import { getAccessTocken } from '../utils/common-utils.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const todoInitialValues = {
    title: '',
    description: '',
    createdOn: new Date(),
    type: taskContainerType.todo,
    userId: ''
}

function AddTodo() {
    const [todo, setTodo] = useState(todoInitialValues);
    const navigate = useNavigate();

    const addTodo = async () => {
        const accessToken = getAccessTocken();
        if (accessToken) {
            const userId = JSON.parse(atob(accessToken.split(' ')[1].split('.')[1]))._id;
            todo.userId = userId;
        }
        try {
            const response = await fetch(ADD_TODO_URL, {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            if (response.status === 200) {
                toast.success('Todo Added successfully', {
                    pauseOnHover: false,
                    position: 'top-center',
                    closeOnClick: true,
                    autoClose: 3000
                });
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleTodo = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <div className='max-w-4xl mx-auto mt-10 font-body p-2'>
                <img src={ques} alt='ques' className='h-44' />
                <div className='bg-white px-4 py-4 shadow-md rounded'>
                    <h3 className='text-sm font-semibold mb-2'>Title</h3>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 text-sm mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="sentence" name='title' onChange={(e) => handleTodo(e)}></input>
                    <h3 className='text-sm font-semibold mt-4 mb-2'>Description</h3>
                    <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 text-sm mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="sentence" rows={10} name='description' onChange={(e) => handleTodo(e)} />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded mt-4 mb-6 text-sm" onClick={() => addTodo()}>
                    Add Todo
                </button>
            </div>
        </div>
    )
}

export default AddTodo