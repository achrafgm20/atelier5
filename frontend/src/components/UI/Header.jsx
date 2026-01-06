import React from 'react'
import logo from '../../assets/logo.jpg'
export default function Header() {
  return (
    <div className='flex justify-between items-center m-5'>
      <div className='flex justify-center items-center gap-4'>
        <img src={logo} alt="logo"  className='w-20 rounded-full'/>
        <h1 className='text-3xl text-amber-400'>REACTFOOD</h1>
      </div>
      <div>
        <h1 className='text-3xl text-amber-400'>
          Cart 
        </h1>
      </div>
      
    </div>
  )
}
