import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet , TouchableOpacity } from 'react-native';
import { getFirestore, collection, query, where, getDocs , deleteDoc , doc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons , MaterialIcons } from '@expo/vector-icons';


export default function WishlistScreen() {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const db = getFirestore();
          const wishlistQuery = query(
            collection(db, 'wishlist'),
            where('userId', '==', user.uid)
          );
          const querySnapshot = await getDocs(wishlistQuery);
          const likedItems = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setWishlist(likedItems);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      }
    };
    fetchWishlist();
  }, []);

  // Function to delete an item from the wishlist
  const handleDelete = async (id: string) => {
    try {
      const db = getFirestore();
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      await deleteDoc(doc(db, 'wishlist', `${userId}_${id}`));
      setWishlist(wishlist.filter((item) => item.id !== id)); // Update state after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Wishlist</Text>
      {wishlist.length > 0 ? (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>₹{item.price}</Text>
              </View>
              {/*  Delete Button (Aligned with Items) */}
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                <MaterialIcons name="delete" size={24} color="#FFA500" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noItemsText}>No items in your wishlist</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  productCard: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productDetails: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 0, 
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
  noItemsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    
  },
  deleteButton: {
    padding: 5, // Space around delete icon
    marginLeft: 35, 
    marginTop: 15, 
  },
});
