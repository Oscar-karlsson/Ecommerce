import React, { useContext } from 'react';
import styles from './CartPage.module.css'; // Import your CSS module here
import { CartContext } from '../context/CartContext';




const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleQuantityChange = (id, quantity) => {
    updateQuantity(id, quantity);
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
};

  return (
    <div className={styles.wrap}>
      <h1 className={styles.projTitle}>Responsive Table<span className={styles.less}>-Less</span> Shopping Cart</h1>
      <div className={styles.heading}>
        <h1>My Cart</h1>
        <a href="#" className={styles.continue}>Continue Shopping</a>
      </div>
      <div className={styles.cart}>
        <ul className={styles.cartWrap}>
          {cart.map(item => (
            <li key={item.id} className={styles.itemsOdd}>
              <div className={styles.infoWrap}>
                <div className={styles.cartSection}>
                  <img src={item.image} alt={item.name} className={styles.itemImg} />
                  <div className={styles.itemInfo}>
                    <p className={styles.itemNumber}>#QUE-007544-002</p>
                    <h3>{item.name}</h3>
                    <div className={styles.priceQty}>
                      <input 
                        type="text" 
                        className={styles.qty} 
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)} 
                      /> 
                      <p>x ${item.price.toFixed(2)}</p>
                    </div>
                    <p className={styles.stockStatus}> In Stock</p>
                  </div>
                  <div className={styles.prodTotal}>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className={styles.removeWrap}>
                  <a href="#" className={styles.remove} onClick={(e) => {
    e.preventDefault();
    handleRemoveFromCart(item.id);
}}>x</a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartPage;
