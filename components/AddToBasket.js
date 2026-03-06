import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function AddToBasket({ onAdd }) {
  return (
    <View style={styles.container}>
      <Button title="Add to Basket" onPress={onAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
});
