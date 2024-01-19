import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import styles from './HeaderSlider.module.css'; // Import CSS as a module
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const HeaderSlider = ({ category }) => {
const slides = [
    {
      image: 'https://www.91-cdn.com/hub/wp-content/uploads/2022/12/Apple-Products-expected-to-launch-in-2023.png',
      title: 'New Apple Products',
      button: 'Shop Now',
      path: '/apple-products' // Add path property
    },
    {
      image: 'https://media.wired.com/photos/6500ad57fe61eb702d721b58/master/pass/Apple-iPhone-15-Pro-Hero-Gear.jpg',
      title: 'Upptäck iPhone 15 Pro',
      button: 'Shop Now',
      path: '/product/658b33d25b510998a5044748'
    },
    {
        image: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/13e20795-3b08-4c92-b3ec-e77638c9783d.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',
      title: '',
      button: 'Shop Now',
      path: '/product/658af4d5d711cabe3c940466'
    },
    // Add more slides as needed
  ];

  return (
    <div className={styles.carouselContainer}>
     <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows autoPlay interval={6000}>
  {slides.map((slide, index) => (
    <div key={index} className={styles.customSlide}>
      <img src={slide.image} alt={slide.title} className={styles.customCarouselImage} />
      <div className={styles.customLegend}>
        <h2 className={styles.customTitle}>{slide.title}</h2>
        <Link to={slide.path} className={styles.customButton}>{slide.button}</Link>
      </div>
    </div>
  ))}
</Carousel>
    </div>
  );
};

export default HeaderSlider;