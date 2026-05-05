import { useState } from "react";
import { CartContext } from "./CartContext";

export default function CartProvider({ children }) {
  const [count, setCount] = useState(0);

  return (
    <CartContext.Provider value={{ count, setCount }}>
      {children}
    </CartContext.Provider>
  );
}