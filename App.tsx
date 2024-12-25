import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation/types';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import { CartProvider } from './contexts/CartContext'; // Import CartProvider
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import OnlinePayment from './screens/OnlinePayment';  // Import the OnlinePayment screen

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <CartProvider> {/* Wrap the app with CartProvider */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Products" component={ProductsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="OnlinePayment" component={OnlinePayment} />

        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
