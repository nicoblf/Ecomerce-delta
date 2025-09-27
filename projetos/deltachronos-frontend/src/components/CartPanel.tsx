// Arquivo: /src/components/CartPanel.tsx

"use client";

import { useApp } from "@/contexts/CartContext";
import Image from "next/image";
import type { CartItem } from "@/types";

export function CartPanel() {
  const { isCartOpen, toggleCart, cart, removeFromCart, updateQuantity } = useApp();

  const cartTotal = cart.reduce((total, item) => total + (item.preco * item.quantity), 0);
  const formattedTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cartTotal);

  return (
    <>
      <div className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleCart} />
      
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-zinc-900 shadow-2xl z-50 transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-white">Seu Carrinho</h2>
            <button onClick={toggleCart} className="text-zinc-500 hover:text-cyan-500 dark:hover:text-cyan-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <p className="text-center text-zinc-500 dark:text-zinc-400 mt-8">Seu carrinho está vazio.</p>
            ) : (
              cart.map((item: CartItem) => {
                // LÓGICA DE DEFESA PARA A IMAGEM
                const imageUrl = item.image_urls && item.image_urls.length > 0 
                  ? item.image_urls[0] 
                  : '/placeholder.png';
                
                return (
                  <div key={item.id} className="flex items-start space-x-4">
                    <div className="relative w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-md">
                      <Image 
                        src={imageUrl} 
                        alt={item.nome} 
                        fill 
                        style={{objectFit: 'contain'}} 
                        className="p-1" 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-zinc-800 dark:text-white">{item.nome}</p>
                      <p className="font-bold text-cyan-500 mt-1">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco)}
                      </p>
                      <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-md mt-2 w-fit">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-lg font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800">-</button>
                        <span className="px-4 py-1 text-md font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-lg font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800">+</button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-zinc-400 hover:text-red-500 transition-colors" aria-label="Remover item">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                )
              })
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex justify-between items-center mb-4"><span className="text-lg font-bold text-zinc-800 dark:text-white">Total</span><span className="text-lg font-bold text-zinc-800 dark:text-white">{formattedTotal}</span></div>
              <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300">Finalizar Compra</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
