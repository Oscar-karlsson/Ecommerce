import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const node = useRef(); // This ref will be attached to the hamburger menu



  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click 
    setIsOpen(false);
  };

  useEffect(() => {
    // when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



   // Temporary cart item count
   const cartItemCount = 99; // Replace with dynamic data later

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.logo}>
        <img src="../src/assets/logo.png" alt="TechStore Logo" style={{ height: '50px', width: 'auto' }} />
      </NavLink>
      <ul className={`${styles.navbarLinks} ${isOpen ? styles.showMenu : ''}`}>
        <li><NavLink to="/products">Products</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        {/* Additional navigation links */}
      </ul>
      <div className={styles.navbarIcons}>
        <Link to="/account">
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link to="/cart" className={styles.cartIcon}>
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartItemCount > 0 && <span className={styles.cartItemCount}>{cartItemCount}</span>}
        </Link>
      </div>
      <div className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu} ref={node}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;