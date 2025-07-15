'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartCount: 0,
});

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from backend or localStorage
  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated && user) {
      // Fetch cart from backend
      axios.get(`${apiUrl}/api/cart/`, { withCredentials: true })
        .then(res => {
          if (res.data && res.data.cart) {
            // Map backend cart to CartItem[]
            const backendCart: CartItem[] = res.data.cart.map((item: any) => ({
              productId: item.products[0]?._id || item.productId,
              name: item.products[0]?.name || '',
              price: item.products[0]?.price || 0,
              image: item.firstImage?.image ? `${apiUrl}${item.firstImage.image}` : '',
              quantity: item.quantity || 1,
            }));
            setCartItems(backendCart);
          } else {
            setCartItems([]);
          }
        })
        .catch(() => setCartItems([]));
    } else {
      // Guest: load from localStorage
      if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          try {
            setCartItems(JSON.parse(storedCart));
          } catch {
            setCartItems([]);
          }
        } else {
          setCartItems([]);
        }
      }
    }
  }, [isAuthenticated, isLoading, user]);

  // Update cart count and localStorage
  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
    if (!isAuthenticated && typeof window !== 'undefined') {
      if (cartItems.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      } else {
        localStorage.removeItem('cart');
      }
    }
  }, [cartItems, isAuthenticated]);

  // Sync local cart to backend on login
  useEffect(() => {
    if (isAuthenticated && user && typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const localCart: CartItem[] = JSON.parse(storedCart);
        // Add each item to backend
        Promise.all(localCart.map(item =>
          axios.post(`${apiUrl}/api/cart/add`, {
            userId: user._id,
            productId: item.productId,
            quantity: item.quantity,
          }, { withCredentials: true })
        )).then(() => {
          localStorage.removeItem('cart');
          // Fetch backend cart again
          axios.get(`${apiUrl}/api/cart/`, { withCredentials: true })
            .then(res => {
              if (res.data && res.data.cart) {
                const backendCart: CartItem[] = res.data.cart.map((item: any) => ({
                  productId: item.products[0]?._id || item.productId,
                  name: item.products[0]?.name || '',
                  price: item.products[0]?.price || 0,
                  image: item.firstImage?.image ? `${apiUrl}${item.firstImage.image}` : '',
                  quantity: item.quantity || 1,
                }));
                setCartItems(backendCart);
              } else {
                setCartItems([]);
              }
            });
        });
      }
    }
  }, [isAuthenticated, user]);

  // Add to cart
  const addToCart = (item: CartItem) => {
    if (isAuthenticated && user) {
      axios.post(`${apiUrl}/api/cart/add`, {
        userId: user._id,
        productId: item.productId,
        quantity: item.quantity,
      }, { withCredentials: true })
        .then(() => {
          // Refetch cart
          axios.get(`${apiUrl}/api/cart/`, { withCredentials: true })
            .then(res => {
              if (res.data && res.data.cart) {
                const backendCart: CartItem[] = res.data.cart.map((item: any) => ({
                  productId: item.products[0]?._id || item.productId,
                  name: item.products[0]?.name || '',
                  price: item.products[0]?.price || 0,
                  image: item.firstImage?.image ? `${apiUrl}${item.firstImage.image}` : '',
                  quantity: item.quantity || 1,
                }));
                setCartItems(backendCart);
              } else {
                setCartItems([]);
              }
            });
        });
    } else {
      setCartItems(prevItems => {
        const existing = prevItems.find(cartItem => cartItem.productId === item.productId && cartItem.variant === item.variant);
        if (existing) {
          return prevItems.map(cartItem =>
            cartItem.productId === item.productId && cartItem.variant === item.variant
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          );
        } else {
          return [...prevItems, item];
        }
      });
    }
  };

  // Remove from cart
  const removeFromCart = (productId: string) => {
    if (isAuthenticated && user) {
      // Find cart item id in backend (not just productId)
      axios.get(`${apiUrl}/api/cart/`, { withCredentials: true })
        .then(res => {
          const cartItem = res.data.cart.find((item: any) => item.products[0]?._id === productId || item.productId === productId);
          if (cartItem) {
            axios.delete(`${apiUrl}/api/cart/${cartItem._id}`, { withCredentials: true })
              .then(() => {
                // Refetch cart
                axios.get(`${apiUrl}/api/cart/`, { withCredentials: true })
                  .then(res2 => {
                    if (res2.data && res2.data.cart) {
                      const backendCart: CartItem[] = res2.data.cart.map((item: any) => ({
                        productId: item.products[0]?._id || item.productId,
                        name: item.products[0]?.name || '',
                        price: item.products[0]?.price || 0,
                        image: item.firstImage?.image ? `${apiUrl}${item.firstImage.image}` : '',
                        quantity: item.quantity || 1,
                      }));
                      setCartItems(backendCart);
                    } else {
                      setCartItems([]);
                    }
                  });
              });
          }
        });
    } else {
      setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
    }
  };

  // Update quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    if (isAuthenticated && user) {
      axios.put(`${apiUrl}/api/cart/change`, {
        userId: user._id,
        productId,
        quantity,
        type: 'SET',
      }, { withCredentials: true })
        .then(() => {
          // Refetch cart
          axios.get(`${apiUrl}/api/cart/`, { withCredentials: true })
            .then(res => {
              if (res.data && res.data.cart) {
                const backendCart: CartItem[] = res.data.cart.map((item: any) => ({
                  productId: item.products[0]?._id || item.productId,
                  name: item.products[0]?.name || '',
                  price: item.products[0]?.price || 0,
                  image: item.firstImage?.image ? `${apiUrl}${item.firstImage.image}` : '',
                  quantity: item.quantity || 1,
                }));
                setCartItems(backendCart);
              } else {
                setCartItems([]);
              }
            });
        });
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  // Clear cart
  const clearCart = () => {
    if (isAuthenticated && user) {
      axios.delete(`${apiUrl}/api/cart/empty`, { withCredentials: true })
        .then(() => setCartItems([]));
    } else {
      setCartItems([]);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
      }
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

export const useCart = () => useContext(CartContext);
