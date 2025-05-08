'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define cart item type
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant: string;
}

// Define context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
}

// Create context with default values
const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartCount: 0,
});

// Sample initial cart data
const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Piping nozzles for cake decoration',
    price: 160.00,
    image: '/images/product1.jpg',
    quantity: 1,
    variant: 'Standard Set'
  },
  {
    id: 2,
    name: 'Professional kitchen knife set',
    price: 3150.00,
    image: '/images/product2.jpg',
    quantity: 2,
    variant: 'Professional'
  }
];

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  // Initialize cart from localStorage on client side
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          setCartItems(parsedCart);
          // Initialize cart count immediately
          const count = parsedCart.reduce((total, item) => total + item.quantity, 0);
          setCartCount(count);
          console.log('Cart loaded from localStorage:', { parsedCart, count });
        } catch (error) {
          console.error('Failed to parse cart from localStorage:', error);
          setCartItems(initialCartItems);
          // Set initial count
          const count = initialCartItems.reduce((total, item) => total + item.quantity, 0);
          setCartCount(count);
        }
      } else {
        setCartItems(initialCartItems);
        // Set initial count
        const count = initialCartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
        console.log('Using initial cart items:', { initialCartItems, count });
      }
    }
  }, []);

  // Update cart count whenever cartItems changes
  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);

    // Save to localStorage
    if (typeof window !== 'undefined') {
      if (cartItems.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      } else {
        localStorage.removeItem('cart');
      }
    }

    // Log for debugging
    console.log('Cart updated:', { cartItems, cartCount: count });
  }, [cartItems]);

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id && cartItem.variant === item.variant);

      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(cartItem =>
          cartItem.id === item.id && cartItem.variant === item.variant
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Add new item
        return [...prevItems, item];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
