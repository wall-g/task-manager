import React from 'react'

function Header() {
  return (
    <div className="App bg-secondary shadow-md antialiased">
    <div className='h-16 flex py-4 max-w-7xl mx-auto px-2 justify-between'>
      <div className='left-header md:flex md:gap-4'>
        <h2 className='l:text-sm text-l font-body font-semibold'> task<span className='text-txt'>Manager.com</span></h2>
      </div>
      <div className='right-header'>
         <button className="bg-txt hover:bg-primary text-white py-2 px-5 rounded l:text-sm sm:text-xs">Logout</button>
      </div>
    </div>
  </div>
  )
}

export default Header