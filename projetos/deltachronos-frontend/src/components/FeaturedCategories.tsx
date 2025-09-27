// Arquivo: src/components/FeaturedCategories.tsx

import Link from 'next/link';
import { Watch, Headphones, Smartphone } from 'lucide-react'; // Ícones que já instalamos

const categories = [
  { name: 'Smartwatches', icon: <Watch size={36} />, href: '/produtos/smartwatches' },
  { name: 'Fones de Ouvido', icon: <Headphones size={36} />, href: '/produtos/fones' },
  { name: 'Acessórios', icon: <Smartphone size={36} />, href: '/produtos/acessorios' },
  // Você pode adicionar mais categorias aqui
];

export function FeaturedCategories() {
  return (
    <section className="bg-gray-50 dark:bg-zinc-950 py-16 sm:py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-zinc-800 dark:text-white mb-4">Explore Nossas Categorias</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
          Encontre exatamente o que você precisa navegando por nossas principais linhas de produtos.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group block bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-md hover:shadow-cyan-500/10 hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-cyan-500 mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-cyan-500/10 mb-6">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mt-4 text-zinc-900 dark:text-white">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}