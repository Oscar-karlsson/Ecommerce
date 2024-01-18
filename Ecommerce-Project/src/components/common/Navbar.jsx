import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.logo}>
        <img src="./src/assets/logo.png" alt="TechStore Logo" style={{ height: '50px', width: 'auto' }} />
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
        <Link to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
      </div>
      <div className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
        {/* Hamburger icon for mobile view */}
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;