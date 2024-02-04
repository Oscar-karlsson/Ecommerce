import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchBar.module.css'; 
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [search , setSearch] = useState('');
  const [products, setProducts] = useState([]); 
  const searchResultsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://js2-ecommerce-api.vercel.app/api/products')
      .then(response => response.json())
      .then(data => {
        if (data) {
          setNumberOfProducts(data.length);
          setProducts(data);
        }
      });

      const handleClickOutside = (event) => {
        if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
          console.log('Click was outside search results');
          setSearch('');
        }
      };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && search.trim() !== '') {
      navigate(`/search?query=${search}`);
      setSearch(''); // clear the search input
    }
  };
  

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.searchBar}>
      <input 
        type="text" 
        placeholder={`Sök bland ${numberOfProducts} Produkter...`} 
        value={search} 
        onChange={e => setSearch(e.target.value)}
        onKeyPress={handleSearchSubmit}
      />
{search.length >= 2 && (
  <div className={styles.searchResults} ref={searchResultsRef}>
{filteredProducts.slice(0, 5).map(product => (
  <Link key={product._id} to={`/product/${product._id}`} onClick={() => setSearch('')}>
    <div className={styles.productItemWrapper}>
      <div className={styles.productItem}>
        <img src={product.images[0]} alt={product.name} className={styles.productImage} />
        <div className={styles.productName}>{product.name}</div>
        <div className={styles.productPrice}>{product.price} kr</div> 
      </div>
    </div>
  </Link>
    ))}
  </div>
)}
    </div>
  );
};
export default SearchBar;