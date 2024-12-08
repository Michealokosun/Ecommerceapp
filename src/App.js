import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./pages/signinpage";
import Register from "./pages/Register";
import { DashobardPage } from "./pages/Dashboard";
import { Provider } from "./libs/usercontext";
import { CartProvider } from "./libs/appcontext";

export default function App() {
  return (
    <div className="App">
      <Provider>
        <CartProvider>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/" element={<DashobardPage />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </CartProvider>
      </Provider>
    </div>
  );
}

// add user to fire store with card cart system
