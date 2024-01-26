  import React, { useState } from 'react';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
  import styles from './LoginRegister.module.css'; // Make sure the path matches your project structure

  const LoginRegister = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    

    return (
      <div className={`${styles.container} ${isRightPanelActive ? styles.rightPanelActive : ''}`}>
        {/* Sign-in form */}
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form action="#" className={styles.form}>
            <h1>Sign In</h1>
            <div className={styles.socialContainer}>
              {/* Implement actual authentication logic */}
              <a href="#" className={styles.social}><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className={styles.social}><FontAwesomeIcon icon={faGooglePlusG} /></a>
              <a href="#" className={styles.social}><FontAwesomeIcon icon={faLinkedinIn} /></a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#" className={styles.forgotPassword}>Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
  
        {/* Sign-up form */}
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form action="#" className={styles.form}>
            <h1>Create Account</h1>
            <div className={styles.socialContainer}>
            <a href="#" className={styles.social}><FontAwesomeIcon icon={faFacebookF} /></a>
<a href="#" className={styles.social}><FontAwesomeIcon icon={faGooglePlusG} /></a>
<a href="#" className={styles.social}><FontAwesomeIcon icon={faLinkedinIn} /></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Repeat Password" />
            <button>Sign Up</button>
          </form>
        </div>
  
        {/* Overlay Container */}
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={styles.overlayPanel} style={{ left: '0' }}>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className={styles.ghost} onClick={() => setIsRightPanelActive(false)}>Sign In</button>
            </div>
            <div className={styles.overlayPanel} style={{ right: '0' }}>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className={styles.ghost} onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default LoginRegister;
