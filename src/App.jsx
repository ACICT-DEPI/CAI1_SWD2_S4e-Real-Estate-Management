import Navbar from "./components/layout/Navbar";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PropertyDetails from './pages/PropertyDetails';
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";
import Form from "./components/add-property/Form"


function App() {

  return (
    <div className='max-w-[1440px] mx-auto bg-white'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/add-property" element={<Form />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

