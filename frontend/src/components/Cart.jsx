import React, { useContext, useState } from 'react';
import { CartContext } from '../store/cart-context';
import currencyFormatter from '../util/formatting';
import { Plus, Minus } from 'lucide-react';
import Modal from './UI/Modal';
import Checkout from './Checkout';

export default function Cart({ onClose }) {
  const cartCtx = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);

  const calculateTotal = () => {
    return cartCtx.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  if (showCheckout) {
    return <Checkout onClose={onClose} onBack={() => setShowCheckout(false)} />;
  }

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>
        
        {cartCtx.items.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {cartCtx.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} x {currencyFormatter.format(item.price)}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => cartCtx.removeItem(item.id)}
                      className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold text-gray-800">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => cartCtx.addItem(item)}
                      className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-300 pt-4 mb-6">
              <div className="flex justify-between items-center text-xl font-bold text-gray-800">
                <span>Total:</span>
                <span>{currencyFormatter.format(calculateTotal())}</span>
              </div>
            </div>
          </>
        )}

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition-all"
          >
            Close
          </button>
          {cartCtx.items.length > 0 && (
            <button 
              onClick={handleCheckout}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition-all"
            >
              Go to Checkout
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}