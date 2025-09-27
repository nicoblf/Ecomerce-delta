// Arquivo: /src/components/Header.tsx

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/contexts/CartContext';
import { Search, User, ShoppingCart, LogOut, Menu } from 'lucide-react';

export function Header() {
  const { totalItems, toggleCart, isAuthenticated, user, logout } = useApp();
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }
    router.push(`/busca?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="bg-zinc-950/90 backdrop-blur-sm sticky top-0 z-50 text-white shadow-lg">
      <nav className="container mx-auto flex items-center justify-between p-4 gap-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="DeltaChronos Logo" width={35} height={35} />
            <span className="hidden sm:inline text-xl font-bold tracking-wider hover:text-cyan-400 transition-colors">
              DeltaChronos
            </span>
          </Link>
          <div className="hidden lg:flex items-center space-x-6 text-sm font-medium text-zinc-300">
            <Link href="/produtos" className="hover:text-white transition-colors">Produtos</Link>
            <Link href="/sobre" className="hover:text-white transition-colors">A Marca</Link>
            <Link href="/contato" className="hover:text-white transition-colors">Contato</Link>
          </div>
        </div>
        <div className="hidden md:flex flex-1 mx-4 max-w-xl">
          <form onSubmit={handleSearchSubmit} className="w-full flex items-center">
            <input
              type="text"
              placeholder="O que você está procurando?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 rounded-l-full py-2 px-5 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="bg-cyan-500 hover:bg-cyan-400 text-black p-2.5 rounded-r-full transition-colors"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2" aria-label="Abrir busca">
              <Search size={22} />
          </button>
          {isAuthenticated ? (
            <>
              <Link href="/minha-conta" className="hidden sm:flex items-center gap-2 text-sm hover:text-cyan-400 transition-colors">
                <User size={22} />
                Olá, {user?.nome?.split(' ')[0]}
              </Link>
              <button onClick={handleLogout} className="hover:text-red-500 transition-colors" aria-label="Sair">
                <LogOut size={22} />
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:text-cyan-400 transition-colors" aria-label="Acessar conta">
              <User size={22} />
            </Link>
          )}
          <button onClick={toggleCart} className="relative hover:text-cyan-400 transition-colors" aria-label="Abrir carrinho">
            <ShoppingCart size={22} />
            {totalItems > 0 && (<span className="absolute -top-2 -right-3 bg-cyan-500 text-xs font-bold text-black rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>)}
          </button>
          <button className="lg:hidden p-2" aria-label="Abrir menu">
              <Menu size={22} />
          </button>
        </div>
      </nav>
    </header>
  );
}