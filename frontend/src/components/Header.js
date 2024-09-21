import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAccessTocken } from '../utils/common-utils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header() {
  const [isAutenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = getAccessTocken();
    (isLogin) ? setIsAuthenticated(true) : setIsAuthenticated(false);
  })

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    toast.success('Logout successful!', {
      pauseOnHover: false,
      position: 'top-center',
      closeOnClick: true,
      autoClose: 3000
    });
    navigate('/auth')
  }

  return (
    <div className="App bg-secondary shadow-md antialiased">
      <div className='h-16 flex py-4 max-w-7xl mx-auto px-2 justify-between'>
        <div className='left-header md:flex md:gap-4'>
          <Link to={isAutenticated? '/': '/auth'}>
            <h2 className='l:text-sm text-l font-body font-semibold'> task<span className='text-txt'>Manager.com</span></h2>
          </Link>
        </div>
        {
          <div className='right-header'>
            {isAutenticated && <button className="bg-txt hover:bg-primary text-white py-2 px-5 rounded l:text-sm sm:text-xs" onClick={() => handleLogout()}>Logout</button>}
          </div>
        }

      </div>
    </div>
  )
}

export default Header