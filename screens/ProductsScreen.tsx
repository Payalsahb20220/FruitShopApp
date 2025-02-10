import React from 'react';
import { View, FlatList, Text, StyleSheet , Button} from 'react-native';
import { products } from '../data'; // Import the product list
import ProductCard from '../components/ProductCard';
import { useCart } from '../contexts/CartContext'; // Use CartContext for global cart state
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;
const ProductsScreen: React.FC = () => {
  const { addToCart, cart } = useCart(); // Access global cart state and methods

  const navigation = useNavigation<CartScreenNavigationProp>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Go to Cart"
          onPress={() => navigation.navigate('Cart')} // Ensure 'Cart' is your route name for CartScreen
          color="#FFA500"
        />
      ),
    });
  }, [navigation]);
  const handleAddToCart = (product: any, quantity: number) => {
    if (quantity > 0) {
      addToCart(product, quantity); // Add product with the specified quantity to the cart
    }
  };

  return (
    <View style={styles.container}>
      {/* Render product list */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard product={item} onAddToCart={handleAddToCart} />
        )}
      />
      {/* Display cart summary */}
      <Text style={styles.cartSummary}>Cart: {cart.length} items</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 8,
  },
  cartSummary: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default ProductsScreen;
