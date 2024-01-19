
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ProductDetail.module.css';


const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // State to manage quantity
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const modalRef = useRef();

    const openModal = (image) => {
      setModalImage(image);
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    
  
    useEffect(() => {
      axios.get(`https://js2-ecommerce-api.vercel.app/api/products/${id}`) // Using the ID to fetch data
        .then(response => {
          setProduct(response.data);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
          // You may want to handle 404 Not Found and 400 Bad Request errors here
        });
    }, [id]);



    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
      };
    
      const addToCart = () => {
        console.log(`Added ${quantity} of ${product.name} to cart.`);
        // Implement your add to cart logic here
      };
  
    if (!product) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className={styles.productDetails}>
        <div className={styles.imageContainer}>
          <div className={styles.mainImageContainer}>
            <img src={product.images[0]} alt={product.name} className={styles.mainImage} />
          </div>
          <div className={styles.thumbnailContainer}>
            {product.images.slice(1).map((image, index) => (
              <img key={index} src={image} alt={`Thumbnail ${index}`} className={styles.thumbnailImage} onClick={() => openModal(image)} />
            ))}
          </div>
        </div>
        <div className={styles.productInfo}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productDescription}>{product.description}</p>
          <div className={styles.actionRow}>
            <p className={styles.productPrice}>{product.price} kr</p>
            <div className={styles.quantityAndButton}>
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={handleQuantityChange} 
                className={styles.quantityInput} 
              />
              <button onClick={addToCart} className={styles.addToCartButton}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        {isModalOpen && (
    <div className={styles.modalBackdrop} onClick={closeModal}>
      <div className={styles.modal} ref={modalRef} onClick={e => e.stopPropagation()}>
        <span className={styles.closeModal} onClick={closeModal}>&times;</span>
        <img src={modalImage} alt="Modal" className={styles.modalContent} />
      </div>
    </div>
        )}
      </div>
    );};


  export default ProductDetail;