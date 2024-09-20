import React from 'react'
import { useState } from 'react'
import Signup from './Signup';
import Login from './Login';

function Auth() {
    const [showRegister, setShowRegister] = useState(false);
    return (
        <>  
            <div className='max-w-4xl mx-auto text-center mt-4 text-gry'>
                <div>
                    <button className='text-sm mt-8 py-2 pr-56 pl-2 rounded shadow-xl bg-secondary'><img src="https://img.icons8.com/color/48/000000/google-logo.png" alt='google' className='inline h-7 w-7 mr-2' />Login with Google</button>
                </div>
            </div>

            <div className='max-w-sm mx-auto mt-8 p-6 rounded shadow-xl bg-secondary'>
                {
                    showRegister? <Signup setShowRegister={setShowRegister}/>: <Login setShowRegister={setShowRegister}/>
                }
            </div>
        </>
    )
}

export default Auth