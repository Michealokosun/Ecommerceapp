import { createContext, useState } from "react";

export const Appcontext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartopen, Setcartopen] = useState(false);
  const [error, seterror] = useState("");

  return (
    <Appcontext.Provider value={{ cartopen, Setcartopen, seterror, error }}>
      {children}
    </Appcontext.Provider>
  );
};
