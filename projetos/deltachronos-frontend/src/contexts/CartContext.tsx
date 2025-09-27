// Arquivo: /src/contexts/CartContext.tsx

"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// MUDANÇA 1: Importamos TODOS os nossos tipos do ficheiro central
import type { Product, CartItem, User } from '@/types'; 
import { jwtDecode } from 'jwt-decode';

// MUDANÇA 2: A interface do contexto agora usa os tipos importados.
interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  totalItems: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('deltachronos-cart');
      if (storedCart) setCart(JSON.parse(storedCart));
      
      const storedToken = localStorage.getItem('deltachronos-token');
      if (storedToken) {
        const decodedUser: User = jwtDecode(storedToken);
        setToken(storedToken);
        setUser(decodedUser);
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // MUDANÇA 3: A função addToCart agora faz a conversão de tipo.
  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        // Quando adicionamos um novo item, convertemos o preço de string para número.
        const newItem: CartItem = {
          ...product,
          preco: Number(product.preco),
          quantity: quantity
        };
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (productId: number) => setCart(prevCart => prevCart.filter(item => item.id !== productId));
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) { removeFromCart(productId); }
    else { setCart(prevCart => prevCart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item)); }
  };
  const toggleCart = () => setIsCartOpen(prev => !prev);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  useEffect(() => { localStorage.setItem('deltachronos-cart', JSON.stringify(cart)); }, [cart]);
  
  const login = (newToken: string) => {
    localStorage.setItem('deltachronos-token', newToken);
    const decodedUser: User = jwtDecode(newToken);
    setToken(newToken);
    setUser(decodedUser);
  };
  const logout = () => {
    localStorage.removeItem('deltachronos-token');
    setToken(null);
    setUser(null);
  };

  const contextValue: AppContextType = {
    cart, addToCart, removeFromCart, updateQuantity, totalItems, isCartOpen, toggleCart,
    token, user, isAuthenticated: !!token, isLoading, login, logout
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within a AppProvider');
  }
  return context;
}
