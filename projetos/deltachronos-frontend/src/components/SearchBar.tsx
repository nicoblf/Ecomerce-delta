// Arquivo: /src/components/SearchBar.tsx

"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  onClose: () => void; // Função para fechar a barra de pesquisa
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Efeito para focar no campo de input assim que o componente aparece
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      router.push(`/busca?q=${trimmedTerm}`);
      onClose(); // Fecha a barra de pesquisa após a busca
    }
  };

  return (
    // O overlay que cobre a tela inteira
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center pt-20"
      onClick={onClose} // Fecha ao clicar fora do formulário
    >
      <div 
        className="w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do formulário feche o overlay
      >
        <form onSubmit={handleSearch} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="O que você procura?"
            className="w-full pl-6 pr-14 py-4 text-lg bg-white/90 dark:bg-zinc-800/90 text-zinc-800 dark:text-white rounded-full border-2 border-transparent focus:border-cyan-500 focus:outline-none transition-all"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-cyan-500 hover:bg-cyan-400 rounded-full text-black transition-colors" aria-label="Pesquisar">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </form>
      </div>
    </div>
  );
}
