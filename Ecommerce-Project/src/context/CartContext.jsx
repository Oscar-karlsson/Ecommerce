import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prevCart => {
            // Check if the product is already in the cart
            const isProductInCart = prevCart.some(item => item.id === product._id);

            if (isProductInCart) {
                // Increase the quantity
                return prevCart.map(item =>
                    item.id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Add the new product to the cart with quantity set to 1
                return [...prevCart, { ...product, id: product._id, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(currentCart => currentCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart(prevCart => 
            prevCart.map(item => 
                item.id === productId ? { ...item, quantity: parseInt(quantity) } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};