import React, { createContext, useContext, useState } from 'react';
import { getFirestore, collection, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig'; // Ensure you have auth imported and configured

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const db = getFirestore();

  const toggleWishlist = async (product: Product) => {
    const user = auth.currentUser;
    if (!user) return;

    const userId = user.uid;
    const wishlistRef = doc(db, 'wishlist', `${userId}_${product.id}`);

    setWishlist((prevWishlist) => {
      const isInWishlist = prevWishlist.some((item) => item.id === product.id);

      if (isInWishlist) {
        // Remove from wishlist
        deleteDoc(wishlistRef)
          .then(() => console.log('Item removed from Firebase wishlist'))
          .catch((error) => console.error('Error removing item:', error));

        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        // Add to wishlist
        setDoc(wishlistRef, { ...product, userId })
          .then(() => console.log('Item added to Firebase wishlist'))
          .catch((error) => console.error('Error adding item:', error));

        return [...prevWishlist, product];
      }
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
