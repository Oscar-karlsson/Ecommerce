import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import ProductDetail from './components/ProductDetail';
import Footer from './components/common/Footer';
import ContactPage from './pages/ContactPage';
import ProductPage from './pages/ProductPage';
import SearchResultsPage from './pages/SearchResultsPage';
import NotFoundPage from './pages/NotFoundPage';
import Loading from './components/Loading';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';



function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a 2 second loading time

    return () => clearTimeout(timer); // Clean up the timer
  }, []);
  return (
    <CartProvider>
    <Router>
      <Navbar />
      {isLoading ? (
        <Loading /> // Render the Loading component if isLoading is true
      ) : (
        <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Kontakta-oss" element={<ContactPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/alla-produkter/" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* other routes */}
      </Routes>
      <Footer />
      </>
      )}
    </Router>
    </CartProvider>
  );
}

export default App;

