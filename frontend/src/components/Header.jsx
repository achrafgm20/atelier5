import React, { useContext, useState } from 'react';
import logo from '../assets/logo.jpg';
import { CartContext } from '../store/cart-context';
import Cart from './Cart';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  const totalItems = cartCtx.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className='flex justify-between items-center m-5'>
        <div className='flex justify-center items-center gap-4'>
          <img src={logo} alt="logo" className='w-20 rounded-full'/>
          <h1 className='text-3xl text-amber-400'>REACTFOOD</h1>
        </div>
        <div>
          <button 
            className='text-xl text-white bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-lg font-semibold transition-all' 
            onClick={() => setShowCart(true)}
          >
            Cart ({totalItems})
          </button>
        </div> 
      </div>

      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </>
  );
}