import React,{ useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import SignUp from './pages/SignUp'; // Import SignUp
import Services from './pages/Services';
import Login from './pages/Login';
import Cart from "./pages/Cart";
import ProductPage from './pages/ProductPage';
import ProductDetail from './pages/ProductDetail';
import ContactUs from './pages/ContactUs'; // Import ContactUs
import Bidding from './pages/Bidding';
import TestingComp from './pages/TestingComp';
import Ctesting from './pages/ctesting';


const Main = () => {
  const [cartItems, setCartItems] = useState([]); //Create global cart state here
  return (
    <Router>
      <NavBar />
      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/product-page"  element={<ProductPage setCartItems={setCartItems} />} />
          {/* <Route path="/product/:productId" element={<ProductDetail />} /> */}
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/product/:productId" element={<ProductDetail setCartItems={setCartItems} />} />
          <Route path="/Bidding" element={<Bidding />} />
          
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/TestingComp" element={<TestingComp />} />
          <Route path="/ctesting" element={<Ctesting/>} />
          
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default Main;
