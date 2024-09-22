import React from 'react'
import { useState } from 'react'
import Signup from './Signup';
import Login from './Login';
import { useGoogleLogin } from '@react-oauth/google';
import { GOOGLE_AUTH_URL } from '../utils/url';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

function Auth() {
    const [showRegister, setShowRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: async (res) => {
            try {
                if (res['code']) {
                    setIsLoading(true);
                    const response = await fetch(`${GOOGLE_AUTH_URL}${res['code']}`)
                    const json = await response.json();
                    if (response.status === 200) {
                        sessionStorage.setItem('accessToken', `Bearer ${json.accessToken}`);
                        toast.success('Login successful', {
                            pauseOnHover: false,
                            position: 'top-center',
                            closeOnClick: true,
                            autoClose: 3000
                        });
                        setIsLoading(false);
                        navigate('/');
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
        onError: (error) => console.error(error),
        flow: 'auth-code'
    })

    return (
        isLoading ?
            <Loading /> :
            <>
                <div className='max-w-4xl mx-auto text-center mt-4 text-gry'>
                    <div>
                        <button className='text-sm mt-8 py-2 pr-56 pl-2 rounded shadow-xl bg-secondary' onClick={() => googleLogin()}><img src="https://img.icons8.com/color/48/000000/google-logo.png" alt='google' className='inline h-7 w-7 mr-2' />Login with Google</button>
                    </div>
                </div>

                <div className='max-w-sm mx-auto mt-8 p-6 rounded shadow-xl bg-secondary'>
                    {
                        showRegister ? <Signup setShowRegister={setShowRegister} setIsLoading={setIsLoading}/> : <Login setShowRegister={setShowRegister} setIsLoading={setIsLoading}/>
                    }
                </div>
            </>

    )
}

export default Auth