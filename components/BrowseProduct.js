// ProductItem
// - Purpose: Renders a single product entry in the product list, including image and action buttons.
// - Props:
//    - item: product object (expects fields like _id/id, name, price, description, image)
//    - onEdit: callback to call with the item when Edit is pressed
//    - onDelete: callback to call with item id when Delete is confirmed
// - Output: a View containing product details and Edit/Delete buttons.

import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';

export default function ProductItem({ item, }) {
    const id = item._id || item.id;
    
  return (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.name || 'Unnamed'}</Text>
      {item.price !== undefined && item.price !== null ? (
        <Text style={styles.itemPrice}>{`€${item.price}`}</Text>
      ) : null}
      {item.description ? <Text style={styles.itemDesc}>{item.description}</Text> : null}
      {item.image && (
        <Image source={{ uri: item.image }} style={{ width: 100, height: 100, borderRadius: 6, marginTop: 10 }} />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    marginVertical: 6,
  },
  itemTitle: { fontSize: 16, fontWeight: '600' },
  itemPrice: { color: '#333', marginTop: 4 },
  itemDesc: { color: '#666', marginTop: 6 },
  itemButtons: { flexDirection: 'row', marginTop: 10 },
  buttonWrap: { marginRight: 8 },
});
