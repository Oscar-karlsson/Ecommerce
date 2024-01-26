import React, { useState, useEffect } from 'react';
import styles from './CategoryFilter.module.css'; // Import your CSS module here
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const API_ENDPOINT = 'https://js2-ecommerce-api.vercel.app/api/products';

const CategoryFilter = ({ onCategorySelected }) => {
  const [categories, setCategories] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const filteredCategories = categories.filter(category => 
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setVisibleCategories(showMore ? filteredCategories : filteredCategories.slice(0, 5));
  }, [categories, searchTerm, showMore]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_CATEGORIES);
      const data = await response.json();
      setCategories(data.categories);
      setVisibleCategories(data.categories.slice(0, 5));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className={styles.categoryFilter}>
     <div className={styles.searchWrapper}>
  <input
    type="text"
    className={styles.searchInput}
    placeholder="Search products"
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
  <button className={styles.toggleButton} onClick={toggleShowMore}>
    <FontAwesomeIcon icon={showMore ? faChevronUp : faChevronDown} />
  </button>
</div>
      <ul className={styles.categoryList}>
        {visibleCategories.map((category, index) => (
          <li key={index} 
              className={styles.categoryItem}
              onClick={() => onCategorySelected(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
