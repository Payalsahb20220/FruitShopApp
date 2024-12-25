import React, { createContext, useContext, useState } from 'react';

// Product type used across the app
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

// CartItem extends Product, adding cartQuantity to track the amount in the cart
interface CartItem extends Product {
  cartQuantity: number;
}

// CartContextType defines all the methods and data the context will provide
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  totalPrice: number;
}

// Create context with CartContextType or undefined (if not available)
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize cart state as an empty array
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add product to the cart with a specific quantity
  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // Update the cartQuantity if the item already exists in the cart
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + quantity }
            : item
        );
      } else {
        // Add a new item to the cart
        return [...prevCart, { ...product, cartQuantity: quantity }];
      }
    });
  };

  // Remove product from the cart by id
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    console.log
  };

  // Update quantity of a product in the cart
  const updateCartQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, cartQuantity: quantity } : item
      )
    );
  };

  // Calculate the total price by multiplying the price with quantity for each item
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateCartQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart data and methods
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
