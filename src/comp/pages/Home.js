// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import Hero from '../components/Hero';
import CategoryScroll from '../components/categoriesScroll';
import Guide from '../components/Guide';
// import ProductList from '../components/ProductList';
import FeatureProductComponent from '../components/FeatureProductComponent';
// import SalesforceIn from './SalesforceIn';

function Home() {
  

  return (
    <div className="home">
    <Hero />
    <CategoryScroll />
    <FeatureProductComponent/>
    <Guide />
    {/* <SalesforceIn /> */}
      
    </div>
  );
}

export default Home;
