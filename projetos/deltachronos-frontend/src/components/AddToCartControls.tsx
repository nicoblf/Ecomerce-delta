// Arquivo: /src/components/AddToCartControls.tsx

"use client";

import { useState } from 'react';
import { useApp } from '@/contexts/CartContext';
import type { Product } from '@/types'; // Importamos o tipo Product centralizado

interface AddToCartControlsProps {
  product: Product; // O componente espera receber um objeto do tipo Product
}

export function AddToCartControls({ product }: AddToCartControlsProps) {
  const { addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const handleIncreaseQuantity = () => setQuantity(prev => prev + 1);

  const handleAddToCart = () => {
    // A função addToCart no nosso contexto já sabe como lidar com o produto.
    // Nós apenas passamos o produto original (onde 'preco' é uma string).
    addToCart(product, quantity);
    alert(`${quantity}x ${product.nome} foi adicionado ao carrinho!`);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-lg">
        <button onClick={handleDecreaseQuantity} className="px-4 py-2 text-2xl font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-l-lg">-</button>
        <span className="px-6 py-2 text-lg font-bold bg-zinc-50 dark:bg-zinc-900">{quantity}</span>
        <button onClick={handleIncreaseQuantity} className="px-4 py-2 text-2xl font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-r-lg">+</button>
      </div>
      <button onClick={handleAddToCart} className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg">
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
