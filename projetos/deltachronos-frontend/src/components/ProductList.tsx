// Arquivo: /src/components/ProductList.tsx

"use client";

import { useState, useMemo } from 'react';
import type { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';

interface ProductListProps {
  allProducts: Product[]; // Recebe a lista completa de produtos
}

export function ProductList({ allProducts }: ProductListProps) {
  // Estados para controlar os filtros selecionados
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Smartwatch", "Fone Bluetooth"]);
  const [selectedPrice, setSelectedPrice] = useState('all');

  // Função para lidar com a mudança de categoria
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) // Se já está selecionada, remove
        : [...prev, category] // Se não, adiciona
    );
  };

  // Lógica para filtrar os produtos usando useMemo para performance
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Filtro de Categoria
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.categoria);
      
      // Filtro de Preço
      let priceMatch = true;
      if (selectedPrice !== 'all') {
        const [min, max] = selectedPrice.split('-').map(Number);
        const price = Number(product.preco);
        if (max) {
          priceMatch = price >= min && price <= max;
        } else {
          priceMatch = price >= min; // Para o caso "Acima de R$400"
        }
      }
      
      return categoryMatch && priceMatch;
    });
  }, [allProducts, selectedCategories, selectedPrice]);


  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-12">
      <ProductFilters 
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        selectedPrice={selectedPrice}
        onPriceChange={setSelectedPrice}
      />
      <div className="flex-1">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-zinc-500">Nenhum produto encontrado com estes filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}
