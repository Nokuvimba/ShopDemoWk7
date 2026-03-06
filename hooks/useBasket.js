// useProducts hook
// - Purpose: Encapsulates product list state and CRUD operations against the backend API.
// - Key outputs (returned object):
//    - products: array of product objects
//    - loading: boolean indicating fetch/delete operations in progress
//    - posting: boolean indicating create/update in progress
//    - fetchProducts(): loads products from API and updates `products`
//    - createProduct(body): creates a product then refreshes list
//    - updateProduct(id, body): updates a product then refreshes list
//    - deleteProduct(id): deletes a product then refreshes list
// - Notes: Delegates actual HTTP calls to `api/productApi.js` and keeps simple loading/posting flags.

import { useState } from 'react';
import basketApi from '../api/basketApi';
import productApi from '../api/productApi';

export default function useBasket() {
  const [products, setBasket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);

  // fetchProducts: fetches product list and updates state
  // - sets loading flag while the request is in-flight
  // - on success sets `products` to the returned array (or empty array)
  async function fetchBasket() {
    setLoading(true);
    try {
      const basketData = await basketApi.getProducts();
      console.log('Raw basket data:', JSON.stringify(basketData, null, 2));
      
      if (!Array.isArray(basketData)) {
        setBasket([]);
        return [];
      }
      
      // Transform basket items to flatten productIds array
      const transformedItems = basketData.map(basketItem => {
        // If productIds is populated, it will be an array of product objects
        const product = basketItem.productIds?.[0];
        console.log('Product from basketItem:', product);
        
        if (product && typeof product === 'object' && product._id) {
          return {
            ...product,
            quantity: basketItem.quantity,
            basketItemId: basketItem._id
          };
        }
        return basketItem;
      });
      
      console.log('Transformed items:', JSON.stringify(transformedItems, null, 2));
      setBasket(transformedItems);
      return transformedItems;
    } finally {
      setLoading(false);
    }
  }


 //adding product to basket
    async function addProductToBasket(item) {
    setPosting(true);
    try {
      const productId = item._id || item.id;
      // Send the product data directly to basket
      const body = { 
        productId,
        productIds: [productId],
        quantity: 1,
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image
      };
      const res = await basketApi.addToBasket(body);
      await fetchBasket();
      return res;
    } finally {
      setPosting(false);
    }
  }


  async function deleteProductInBasket(id) {
    setLoading(true);
    try {
      await basketApi.removeFromBasket(id);
      await fetchBasket();
    } finally {
      setLoading(false);
    }
  }

 


  return {
    fetchBasket,
    addProductToBasket,
    deleteProductInBasket,
    products,
    loading,
    posting,
  };
}
