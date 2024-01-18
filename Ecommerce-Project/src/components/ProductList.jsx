import React from "react";
import Product from "./Product";
import styles from "./ProductList.module.css";


const ProductList = ({ products }) => {
    // Group products by category
    const productsByCategory = products.reduce((acc, product) => {
      const key = product.category;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(product);
      return acc;
    }, {});
  
    return (
        <div className={styles.productListContainer}>
          {Object.entries(productsByCategory).map(([category, products]) => (
            <>
              <h2 className={styles.categoryTitle}>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
              <div className={styles.products}>
                {products.map(product => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            </>
          ))}
        </div>
      );};
  

  export default ProductList;