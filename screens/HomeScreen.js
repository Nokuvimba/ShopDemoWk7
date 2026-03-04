// HomeScreen
// - Purpose: Simple welcome screen with navigation to Inventory screen.
// - Props:
//    - navigation: react-navigation prop used to navigate to other screens
// - Output: renders a welcome message and a button to go to Inventory.

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ShopDemo</Text>
      <Text style={styles.text}>Manage your inventory from the Inventory screen.</Text>
      <Button title="Go to Inventory" onPress={() => navigation.navigate('Inventory')} />
      <Button title="Product Browser" onPress={() => navigation.navigate('Product Browser')} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  text: { marginBottom: 16, color: '#444' },
});
