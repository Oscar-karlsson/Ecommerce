import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import styles from "../common/Footer.module.css";








const Footer = () => (
    <>
    <footer className={styles.footer}>
        <div className={styles.footerSection}>
            <h4>KONTOSIDOR</h4>
            <ul>
                <li><a href="#">Konto</a></li>
                <li><a href="#">Orderhistorik</a></li>
                <li><a href="#">Presentkort</a></li>
                <li><a href="#">Personuppgifter</a></li>
            </ul>
        </div>
        <div className={styles.footerSection}>
            <h4>INFORMATION</h4>
            <ul>
                <li><a href="#">Om HardwareHive </a></li>
                <li><a href="#">Lediga tjänster</a></li>
                <li><a href="#">Nya produkter</a></li>
                <li><a href="#">Nytt i lager</a></li>
                <li><a href="#">Om oss</a></li>
            </ul>
        </div>
        <div className={styles.footerSection}>
            <h4>KUNDSERVICE</h4>
            <ul>
                <li><a href="#">Kundservice</a></li>
                <li><a href="#">Ångerrätt</a></li>
                <li><a href="#">Retur/reparation</a></li>
                <li><a href="#">Märke/producent</a></li>
                <li><a href="#">Företag</a></li>
            </ul>
        </div>
        <div className={styles.footerSection}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <p>HardwareHive skickar beställda varor inom 24 timmar om de finns i vårt webblager. Alla priser är i svenska kronor inklusive moms och gäller även i butik.</p>
        </div>
    </footer>
    <div className={styles.secondaryFooter}>
    <a href="#"  rel="noopener noreferrer">
        <FaFacebook />
    </a>
    <a href="#"  rel="noopener noreferrer">
        <FaTwitter />
    </a>
    <a href="#"  rel="noopener noreferrer">
        <FaInstagram />
    </a>
    <a href="#"  rel="noopener noreferrer">
        <FaLinkedin />
    </a>
</div>
</>
    
);

export default Footer;