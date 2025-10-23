import React from 'react';
import ShoppingCart from '../components/ShoppingCart';
import Footer from '../components/Footer';

const CartPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <ShoppingCart />
      <Footer />
    </div>
  );
};

export default CartPage;
