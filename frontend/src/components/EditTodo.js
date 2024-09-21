import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { TODO_BY_ID_URL } from '../utils/url.js';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { UPDATE_TODO_URL } from '../utils/url.js';

function EditTodo() {
    const [todo, setTodo] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const { id } = useParams();

    useEffect(() => {
        getTodoById();
        inputRef.current.focus()
    }, [])

    const getTodoById = async () => {
        const data = await fetch(`${TODO_BY_ID_URL}/${id}`);
        const response = await data.json();
        setTodo(response);
    }   
    const handleTodo = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value });
    }
    const editTodo = async () => {
        try {
            await fetch(`${UPDATE_TODO_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(todo)
            })
            toast.success('Todo Updated', {
                pauseOnHover: false,
                position: 'top-center',
                closeOnClick: true,
                autoClose: 3000
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className='max-w-4xl mx-auto font-body p-2 mt-24'>
                <div className='bg-secondary px-4 py-4 shadow-md rounded'>
                    <h3 className='text-sm font-semibold mb-2'>Title</h3>
                    <input ref={inputRef} value={todo.title} className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-1 px-2 text-sm mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="sentence" name='title' onChange={(e) => handleTodo(e)}></input>
                    <h3 className='text-sm font-semibold mt-4 mb-2'>Description</h3>
                    <textarea value={todo.description} className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-1 px-2 text-sm mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="sentence" rows={10} name='description' onChange={(e) => handleTodo(e)} />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded mt-4 mb-6 text-sm" onClick={() => editTodo()}>
                    Edit Todo
                </button>
            </div>
        </div>
    )
}

export default EditTodo