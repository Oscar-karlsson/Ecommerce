import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchBar.module.css'; // Import the CSS module


const SearchBar = () => {
  const [numberOfProducts, setNumberOfProducts] = useState(0);

  useEffect(() => {
    fetch('https://js2-ecommerce-api.vercel.app/api/products')
      .then(response => response.json())
      .then(data => {
        if (data) {
          setNumberOfProducts(data.length); // Get the length of data directly
        }
      });
  }, []);

  return (
    <div className={styles.searchBar}>
      <input type="text" placeholder={`Sök bland ${numberOfProducts} Produkter...`} />
      <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
    </div>
  );
};
export default SearchBar;