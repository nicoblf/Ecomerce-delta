// Arquivo: src/components/FilterSidebar.tsx

"use client";

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

const categoryOptions = ["Smartwatch", "Fone Bluetooth"];
const priceOptions = [
    { value: 'all', label: 'Todos' },
    { value: '0-400', label: 'Até R$400' },
    { value: '401-800', label: 'R$401 - R$800' },
    { value: '801-1200', label: 'R$801 - R$1200' },
    { value: '1201-9999', label: 'Acima de R$1200' },
];

export function FilterSidebar() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isPricesOpen, setIsPricesOpen] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (type: 'category' | 'price', value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (type === 'category') {
      const allCategories = params.getAll('category');
      if (allCategories.includes(value)) {
        const newCategories = allCategories.filter(cat => cat !== value);
        params.delete('category');
        newCategories.forEach(cat => params.append('category', cat));
      } else {
        params.append('category', value);
      }
    }

    if (type === 'price') {
      if (value === 'all') {
        params.delete('price');
      } else {
        params.set('price', value);
      }
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const selectedCategories = searchParams.getAll('category');
  const selectedPrice = searchParams.get('price') || 'all';

  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm self-start">
      <div className="space-y-6">
        <div>
          <button 
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            className="w-full flex justify-between items-center font-bold text-lg mb-4"
          >
            Categorias
            <ChevronDown 
              className={`transform transition-transform duration-300 ${isCategoriesOpen ? 'rotate-180' : ''}`} 
              size={20} 
            />
          </button>
          {isCategoriesOpen && (
            <ul className="space-y-2 animate-fade-in">
              {categoryOptions.map(cat => (
                <li key={cat}>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-cyan-500 font-normal text-sm">
                    <input 
                      type="checkbox"
                      className="rounded text-cyan-500 focus:ring-cyan-500"
                      onChange={() => handleFilterChange('category', cat)}
                      checked={selectedCategories.includes(cat)}
                    />
                    {cat}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-zinc-200 dark:border-zinc-700"></div>
        <div>
        <button 
            onClick={() => setIsPricesOpen(!isPricesOpen)}
            className="w-full flex justify-between items-center font-bold text-lg mb-4"
          >
            Preço
            <ChevronDown 
              className={`transform transition-transform duration-300 ${isPricesOpen ? 'rotate-180' : ''}`} 
              size={20} 
            />
          </button>
          {isPricesOpen && (
            <ul className="space-y-2 animate-fade-in">
              {priceOptions.map(price => (
                <li key={price.value}>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-cyan-500 font-normal text-sm">
                    <input 
                      type="radio" 
                      name="price" 
                      className="text-cyan-500 focus:ring-cyan-500"
                      onChange={() => handleFilterChange('price', price.value)}
                      checked={selectedPrice === price.value}
                    />
                    {price.label}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
}