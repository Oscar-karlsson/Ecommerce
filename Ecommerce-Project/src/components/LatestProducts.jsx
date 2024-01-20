import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import productListStyles from './ProductList.module.css';
import styles from './Product.module.css';

const NextArrow = ({ onClick }) => (
  <div
    style={{ 
      color: "#000", 
      fontSize: "2rem", 
      zIndex: "1", 
      cursor: "pointer", 
      position: "absolute", 
      top: "45%", 
      right: "2%" 
    }}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faChevronRight} />
  </div>
);

const PrevArrow = ({ currentSlide, onClick }) => (
  <div
    style={{ 
      color: "#000", 
      fontSize: "2rem", 
      zIndex: "1", 
      cursor: "pointer", 
      position: "absolute", 
      top: "45%", 
      left: "2%"
    }}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faChevronLeft} />
  </div>
);

const LatestProducts = ({ products }) => {
    // Get the 5 latest products
    const latestProducts = products.slice(0, 10);
    const navigate = useNavigate();

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        }
      ]
    };
  
    return (
      <div className={productListStyles.productListContainer}>
        <h2 className={productListStyles.categoryTitle}>Nyheter</h2>
        <Slider {...settings}>
          {latestProducts.map((product) => {
            const imageUrl = product.images.length > 0 ? product.images[0] : '/path-to-default-image.jpg';
  
            const handleProductClick = () => {
              // Navigate to product detail page
              navigate(`/product/${product._id}`);
            };

            const handleAddToCart = (e) => {
              e.stopPropagation(); // Prevents the click from triggering the navigation
              // Add to cart logic here
            };

            return (
              <div className={styles.carouselContainer}>
              <div key={product._id} className={styles.productCard} onClick={handleProductClick}>
                <img src={imageUrl} alt={product.name} />
                <div className={styles.titleAndDescriptionContainer}>
                  <h3>{product.name}</h3>
                  <p className={styles.productDescription}>{product.description}</p>
                </div>
                <div className={styles.priceAndButtonContainer}>
                  <p className={styles.productPrice}>{product.price} kr</p>
                  <button className={styles.addToCartButton} onClick={handleAddToCart}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </button>
                </div>
              </div>
              </div>
            );
          })}
        </Slider>
      </div>
    );
};

export default LatestProducts;