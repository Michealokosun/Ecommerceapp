import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebaseconfig";
// import { getUserCurrentState } from "./firebaseconfig";

export const userAuth = createContext(null);

export const Provider = ({ children }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setuser(user);

      return () => unsubscribe();
    });
  }, []);
  const [user, setuser] = useState({});

  return (
    <userAuth.Provider value={{ user, setuser }}>{children}</userAuth.Provider>
  );
};
