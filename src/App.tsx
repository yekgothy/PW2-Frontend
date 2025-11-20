import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import UserProfile from './pages/userProfile';
import CheckoutPage from './pages/CheckoutPage';
import SearchResults from './pages/SearchResults';
import Catalog from './pages/Catalog'; // <-- existing
import Offers from './pages/Offers'; // <-- nueva importación

import ProductDetail from "./pages/ProductDetail";


function App() {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/offers" element={<Offers />} /> {/* <-- nueva ruta */}
            <Route path="/product/:id" element={<ProductDetail />} /> {/* ruta dinámica */}
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
