import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Button,
  TextInput,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import useBasket from '../hooks/useBasket';

export default function BasketScreen() {
  const { products, loading, fetchBasket, deleteProductInBasket } = useBasket();
  const [quantities, setQuantities] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      fetchBasket();
    }, [])
  );

  useEffect(() => {
    const initialQuantities = {};
    products.forEach(item => {
      const id = item._id || item.id;
      initialQuantities[id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [products]);

  function updateQuantity(id, value) {
    const num = parseInt(value) || 1;
    setQuantities(prev => ({ ...prev, [id]: num }));
  }

  async function handleDelete(id) {
    Alert.alert(
      'Remove from basket',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProductInBasket(id);
              Alert.alert('Removed', 'Product removed from basket');
            } catch (err) {
              Alert.alert('Error', String(err));
            }
          },
        },
      ]
    );
  }

  function renderItem({ item }) {
    const id = item._id || item.id;
    const quantity = quantities[id] || 1;
    const itemTotal = (item.price || 0) * quantity;

    return (
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{item.name || 'Unnamed'}</Text>
        {item.price !== undefined && item.price !== null ? (
          <Text style={styles.itemPrice}>€{item.price} each</Text>
        ) : null}
        
        <View style={styles.quantityRow}>
          <Text>Quantity: </Text>
          <TextInput
            style={styles.quantityInput}
            value={String(quantity)}
            onChangeText={(val) => updateQuantity(id, val)}
            keyboardType="numeric"
          />
          <Text style={styles.itemTotal}>Total: €{itemTotal.toFixed(2)}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Remove" color="#d9534f" onPress={() => handleDelete(id)} />
        </View>
      </View>
    );
  }

  const basketTotal = products.reduce((sum, item) => {
    const id = item._id || item.id;
    const quantity = quantities[id] || 1;
    return sum + (item.price || 0) * quantity;
  }, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Basket ({products.length} items) - Total: €{basketTotal.toFixed(2)}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, idx) => item.basketItemId || item._id || item.id || String(idx)}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.empty}>Your basket is empty.</Text>}
          contentContainerStyle={products.length === 0 ? styles.emptyContainer : null}
        />
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
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  item: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    marginVertical: 6,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemPrice: {
    color: '#333',
    marginTop: 4,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 6,
    width: 60,
    marginHorizontal: 8,
    textAlign: 'center',
  },
  itemTotal: {
    marginLeft: 'auto',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  empty: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
