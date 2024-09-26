import Header from "./components/Home/Header";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PropertyDetails from './pages/PropertyDetails';
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";

function App() {

  return (
    <div className='max-w-[1440px] mx-auto bg-white'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

