import React, { useState , useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity ,Alert } from 'react-native';
import { getFirestore, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import { Platform } from 'react-native';
import { useCart } from '../contexts/CartContext';


interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: any;
}

interface ProductCardProps {
  product: Product;
  // onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, updateCartQuantity, cart  , removeFromCart} = useCart();
  const [liked, setLiked] = useState(false);
  // const [quantity, setQuantity] = useState(0); // Default quantity is 0

  // Find product in the cart
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.cartQuantity : 0;


  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  useEffect(() => {
    const checkWishlist = async () => {
      if (!auth.currentUser) return;
      const db = getFirestore();
      const userId = auth.currentUser.uid;
      const wishlistRef = doc(db, "wishlist", `${userId}_${product.id}`);
      
      const docSnap = await getDoc(wishlistRef);
      if (docSnap.exists()) {
        setLiked(true);
      }
    };

    checkWishlist();
  }, [product.id]);

  const handleLike = async () => {
    if (!auth.currentUser) {
      showAlert("Login Required", "Please log in to use the wishlist.");
      return;
    }

    const db = getFirestore();
    const userId = auth.currentUser.uid;
    const wishlistRef = doc(db, "wishlist", `${userId}_${product.id}`);

    if (liked) {
      await deleteDoc(wishlistRef);
      setLiked(false);
    } else {
      await setDoc(wishlistRef, {
        userId,
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
      });
      setLiked(true);
    }
  };


  // const increaseQuantity = () => setQuantity((prev) => prev + 1);
  // const decreaseQuantity = () =>
  //   setQuantity((prev) => (prev > 0 ? prev - 1 : 0)); // Prevent going below 0

  return (
    <View style={styles.card}>
      <Image source={ product.image } style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>₹{product.price}</Text>

      {/* Quantity Selector */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {
            if (quantity > 1) {
              updateCartQuantity(product.id, quantity - 1);
            } else {
              removeFromCart(product.id);
            }
          }}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity style={styles.button} onPress={() => addToCart(product, 1)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Like Button */}
      <TouchableOpacity
        style={[styles.likeButton, liked ? styles.liked : styles.notLiked]}
        onPress={handleLike}
      >
        <Text style={styles.likeText}>{liked ? '❤️ Liked' : '🤍 Like'}</Text>
      </TouchableOpacity>

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => addToCart(product, 1)}
      >
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
   
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  likeButton: {
    marginVertical: 8,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  liked: {
    backgroundColor: '#ffcccc',
  },
  notLiked: {
    backgroundColor: '#eee',
  },
  likeText: {
    fontSize: 16,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductCard;
