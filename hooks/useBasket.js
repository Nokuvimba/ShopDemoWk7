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
      
      // Transform basket items with new structure
      const transformedItems = basketData.map(item => ({
        ...item.productId,
        quantity: item.quantity,
        basketItemId: item._id
      }));
      
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
      const body = { productId, quantity: 1 };
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
