import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ProductPage.module.css';
import productStyles from '../components/Product.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const INITIAL_VISIBLE_COUNT = 10;

const SearchResultsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(INITIAL_VISIBLE_COUNT);
    const [error, setError] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('query');
    const navigate = useNavigate();
  
    useEffect(() => {
        setIsLoading(true);
        fetch('https://js2-ecommerce-api.vercel.app/api/products')
          .then(response => response.json())
          .then(data => {
            setVisible(INITIAL_VISIBLE_COUNT);
            // Ensure searchTerm is not null or undefined
            if (searchTerm) {
              const filteredProducts = data.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              );
              setProducts(filteredProducts);
            } else {
              // If no searchTerm, you can choose to set an empty array or the full list
              setProducts([]);
            }
            setIsLoading(false);
          })
          .catch(error => {
            setError(error);
            setIsLoading(false);
          });
      }, [searchTerm]);


      const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
      };
    
      const loadMore = () => {
        setVisible(prevVisible => prevVisible + 10);
      };
  

  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
        <div>Error: {error.message}</div>
    }
  
    return (
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : (
            <div className={styles.productsContainer}>
            <div className={styles.productsGrid}>
              {products.slice(0, visible).map(product => (
                <div key={product._id} className={productStyles.productCard} onClick={() => handleProductClick(product._id)}>
                  <img src={product.images[0]} alt={product.name} />
                  <div className={productStyles.titleAndDescriptionContainer}>
                    <h3>{product.name}</h3>
                    <p className={productStyles.productDescription}>{product.description}</p>
                  </div>
                  <div className={productStyles.priceAndButtonContainer}>
                    <p className={productStyles.productPrice}>{product.price} kr</p>
                    <button className={productStyles.addToCartButton} onClick={(e) => { e.stopPropagation(); /* handleAddToCart function here */ }}>
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {visible < products.length && (
              <button className={styles.loadMoreButton} onClick={loadMore}>Visa fler produkter</button>
            )}
          </div>
        )}
    </div>
  );
};
  
  export default SearchResultsPage;