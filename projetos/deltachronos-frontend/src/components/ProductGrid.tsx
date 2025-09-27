// Arquivo: src/components/ProductGrid.tsx

"use client";

import { useState } from 'react';
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { SortDropdown } from "./SortDropdown";
import { ViewModeSwitcher } from './ViewModeSwitcher';
import { Search } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [cols, setCols] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => 
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="w-full">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <p className="text-sm text-zinc-500">
          Exibindo {filteredProducts.length} de {products.length} produtos
        </p>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text"
              placeholder="Filtrar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md pl-10 pr-3 py-2 text-sm w-32 sm:w-40 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <ViewModeSwitcher onViewChange={setCols} currentCols={cols} />
          <SortDropdown />
        </div>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-8 xl:grid-cols-${cols}`}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-zinc-500">Nenhum produto encontrado com o termo "{searchTerm}".</p>
          </div>
        )}
      </div>
    </main>
  );
}