import React, { useContext } from 'react'
import { CartContext } from '../store/cart-context'
import currencyFormatter from '../util/formatting'
import Button from './UI/Button';

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleAddMeal() {
    cartCtx.addItem(meal);
  }
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000" ;
   
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <img
        src={`${API_URL}/${meal.image}`}
        alt={meal.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col grow">
        <h3 className="text-xl font-bold mb-2">{meal.name}</h3>
        <p className="text-gray-800 mb-4 grow">{meal.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <strong className="text-lg font-bold text-yellow-600">{currencyFormatter.format(meal.price)}</strong>
          <Button text="Add to Cart" onClick={handleAddMeal} >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
