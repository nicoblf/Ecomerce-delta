// Arquivo: /src/components/ProductFilters.tsx

"use client";

// As categorias que temos disponíveis
const categories = ["Smartwatch", "Fone Bluetooth"];
// As faixas de preço
const priceRanges = [
  { label: "Todos", value: "all" },
  { label: "Até R$200", value: "0-200" },
  { label: "R$201 - R$400", value: "201-400" },
  { label: "Acima de R$400", value: "401-9999" },
];

interface ProductFiltersProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  selectedPrice: string;
  onPriceChange: (price: string) => void;
}

export function ProductFilters({ 
  selectedCategories, 
  onCategoryChange,
  selectedPrice,
  onPriceChange
}: ProductFiltersProps) {
  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="space-y-6">
        {/* Filtro de Categoria */}
        <div>
          <h3 className="text-lg font-bold text-zinc-800 dark:text-white mb-3">Categorias</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onCategoryChange(category)}
                  className="h-4 w-4 rounded text-cyan-600 focus:ring-cyan-500 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                />
                <span className="text-zinc-700 dark:text-zinc-300">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filtro de Preço */}
        <div>
          <h3 className="text-lg font-bold text-zinc-800 dark:text-white mb-3">Preço</h3>
          <div className="space-y-2">
            {priceRanges.map(range => (
               <label key={range.value} className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio"
                  name="price"
                  value={range.value}
                  checked={selectedPrice === range.value}
                  onChange={(e) => onPriceChange(e.target.value)}
                  className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-zinc-300 dark:border-zinc-700"
                />
                <span className="text-zinc-700 dark:text-zinc-300">{range.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
