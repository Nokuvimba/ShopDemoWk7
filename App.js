// App
// - Purpose: Application entry point. Sets up React Navigation with Home and Inventory screens.
// - Output: NavigationContainer with stack navigator containing `Home` and `Inventory`.

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import InventoryScreen from './screens/InventoryScreen';
import ProductBrowserScreen from './screens/ProductBrowser';
import BasketScreen from './screens/Basket';

//const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Inventory" component={InventoryScreen} options={{ title: 'Inventory' }} />
        <Tab.Screen name="Product Browser" component={ProductBrowserScreen} options={{ title: 'Products' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
