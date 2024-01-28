import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Navbar.module.css';
import SearchBar from '../SearchBar';
import { CartContext } from '../../context/CartContext';
import { AuthProvider, useAuth } from '../../context/AuthContext';





const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const node = useRef();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // Get isLoggedIn from useAuth

  const handleClickOutside = (e) => {
    if (node.current && !node.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleAccountIconClick = () => {
    if (isLoggedIn) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const { cart } = useContext(CartContext);

const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

const [key, setKey] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  

  return (
    <nav className={styles.navbar}>
      <div className={styles.topRow}>
        <NavLink to="/" className={styles.logo}>
          <img src="../src/assets/logo-text.png" alt="TechStore Logo" style={{ height: '50px', width: 'auto' }} />
        </NavLink>
        
        <div className={styles.searchBar}>
          <SearchBar />
        </div>
  
        <div className={styles.rightSide}>
          <div className={styles.navbarIcons}>
          <FontAwesomeIcon icon={faUser} onClick={handleAccountIconClick} />
            <Link to="/cart" className={styles.cartIcon}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartItemCount > 0 && (
                <span className={styles.cartItemCount}>{cartItemCount > 99 ? '99+' : cartItemCount}</span>
              )}
            </Link>
          </div>
  
          <div className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu} ref={node}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
  
      <ul className={`${styles.navbarLinks} ${isOpen ? styles.showMenu : ''}`}>
        <li><NavLink to="/alla-produkter">Alla Produkter</NavLink></li>
        <li><NavLink to="/kontakta-oss">Kontakta oss</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        {/* Additional navigation links */}
      </ul>
    </nav>
  );}

export default Navbar;