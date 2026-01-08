import { useState } from "react";
import { CartContext } from "./cart-context";

const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  function addItem(item) {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);
      
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      }
      
      return [...prevItems, { ...item, quantity: 1 }];
    });
  }

  function removeItem(id) {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === id);
      const existingItem = prevItems[existingItemIndex];

      if (existingItem.quantity === 1) {
        return prevItems.filter((item) => item.id !== id);
      }

      const updatedItems = [...prevItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity - 1
      };
      return updatedItems;
    });
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;