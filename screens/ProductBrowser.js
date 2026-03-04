// InventoryScreen
// - Purpose: Orchestrates the inventory UI: shows product list and provides add/edit/delete flows.
// - Key inputs: none (uses internal state and the `useProducts` hook to fetch/manage products).
// - Key outputs: renders AddEditProduct form, product list (ProductItem), and invokes create/update/delete via the hook.
// - Notes: This file should remain orchestration-only: UI and logic for form, image picking, and API calls are delegated to components and hooks.

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

import ProductItem from '../components/BrowseProduct';
import AddEditProduct from '../components/AddEditProduct';
import useProducts from '../hooks/useProducts';

export default function ProductBrowserScreen() {
  const { products, loading, posting, fetchProducts, createProduct, updateProduct, deleteProduct } = useProducts();

  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);


  function renderItem({ item }) {
     return <ProductItem item={item} />;
  }

  return (
    <View style={styles.container}>
    
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList data={products} keyExtractor={(item, idx) => item._id || item.id || String(idx)} renderItem={renderItem} ListEmptyComponent={<Text style={styles.empty}>No products found.</Text>} contentContainerStyle={products.length === 0 ? styles.emptyContainer : null} />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
  textArea: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  spacer: { width: 12 },
  empty: { textAlign: 'center', color: '#666', marginTop: 20 },
  emptyContainer: { flex: 1, justifyContent: 'center' },
});
