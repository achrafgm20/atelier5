import React, { useState, useContext } from 'react';
import { CartContext } from '../store/cart-context';
import currencyFormatter from '../util/formatting';
import Modal from './UI/Modal';

export default function Checkout({ onClose, onBack }) {
  const cartCtx = useContext(CartContext);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    street: '',
    postalCode: '',
    city: ''
  });

  const calculateTotal = () => {
    return cartCtx.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitOrder = async () => {
    try {
      const orderData = {
        order: {
          items: cartCtx.items.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          customer: {
            name: formData.fullName,
            email: formData.email,
            street: formData.street,
            'postal-code': formData.postalCode,
            city: formData.city
          }
        }
      };
      const API_URL = import.meta.env.VITE_BACKEND_URL || "https://localhost:3000" ;
      const response = await fetch('${API_URL}/orders ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const result = await response.json();
      console.log('Order submitted:', result);

      setTimeout(() => {
        setShowSuccess(true);
      }, 100);

    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    }
  };

  const handleCloseSuccess = () => {
    cartCtx.clearCart();
    onClose();
  };

  if (showSuccess) {
    return (
      <Modal onClose={handleCloseSuccess}>
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Success!</h2>
          <p className="text-gray-700 mb-2">Your order was submitted successfully.</p>
          <p className="text-gray-600 text-sm mb-6">
            We will get back to you with more details via email within the next few minutes.
          </p>
          
          <button 
            onClick={handleCloseSuccess}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-all"
          >
            Okay
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-left">Checkout</h2>
        <p className="text-gray-600 mb-6 text-left">Total Amount: {currencyFormatter.format(calculateTotal())}</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-800 font-semibold mb-2 text-left">Full Name</label>
            <input 
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-gray-800"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2 text-left">E-Mail Address</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-gray-800"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2 text-left">Street</label>
            <input 
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-gray-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-800 font-semibold mb-2 text-left">Postal Code</label>
              <input 
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-gray-800 "
              />
            </div>
            
            <div>
              <label className="block text-gray-800 font-semibold mb-2 text-left">City</label>
              <input 
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-gray-800 text-left"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button 
              onClick={onBack}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Back
            </button>
            <button 
              onClick={handleSubmitOrder}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-all "
            >
              Submit Order
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}