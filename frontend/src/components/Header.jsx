import React, {  useContext } from 'react'
import logo from '../assets/logo.jpg'
import { CartContext } from '../store/cart-context';
export default function Header() {

  
  const cartCtx = useContext(CartContext);
  return (
    <div className='flex justify-between items-center m-5'>
      <div className='flex justify-center items-center gap-4'>
        <img src={logo} alt="logo"  className='w-20 rounded-full'/>
        <h1 className='text-3xl text-amber-400'>REACTFOOD</h1>
      </div>
      <div>
        <button className='text-3xl text-amber-400'>
          Cart 
          (<span>{cartCtx.items.length}</span>)
        </button>
      </div>
      
    </div>
  )
}
