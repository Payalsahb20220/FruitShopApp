import React , { useState } from 'react';
import { View, FlatList, Text, TextInput ,StyleSheet , Button} from 'react-native';
import { products } from '../data'; // Import the product list
import ProductCard from '../components/ProductCard';
import { useCart } from '../contexts/CartContext'; // Use CartContext for global cart state
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;
const ProductsScreen: React.FC = () => {
  const { addToCart, cart } = useCart(); // Access global cart state and methods
  const [searchQuery, setSearchQuery] = useState(''); // Search input state

  // Function to filter products based on search
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
  );



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
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for fruits or juices..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery} // Update search query
      />

      {/* Render product list */}
      <FlatList
        data={filteredProducts} // Display filtered results
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard product={item}  />
        )}
      />
      {/* Display cart summary */}
      <Text style={styles.cartSummary}>Cart: {cart.length} items</Text>
      {/* ListEmptyComponent={<Text style={styles.noResults}>No results found</Text>} // Show when no match */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 8,
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  cartSummary: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default ProductsScreen;
