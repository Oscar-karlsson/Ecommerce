import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import ProductDetail from './components/ProductDetail';
import Footer from './components/common/Footer';
import ContactPage from './pages/ContactPage';
import ProductPage from './pages/ProductPage';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Kontakta-oss" element={<ContactPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/alla-produkter/" element={<ProductPage />} />
        {/* other routes */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

