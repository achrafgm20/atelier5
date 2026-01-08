import { useState } from "react";
import { CartContext } from "./cart-context";

const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  function addItem(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function removeItem(id) {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
