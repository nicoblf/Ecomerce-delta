// Arquivo: /src/app/busca/page.tsx

import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types";

// Função para buscar os produtos no backend com base num termo de busca
async function searchProducts(query: string): Promise<Product[]> {
  if (!query) {
    return [];
  }
  try {
    // A URL é construída de forma segura para evitar erros com espaços ou caracteres especiais
    const response = await fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(query)}`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Falha ao buscar os resultados');
    }
    return response.json();
  } catch (error) {
    console.error('Erro na busca:', error);
    return []; 
  }
}

// A forma correta de tipar as props para a página de busca
interface SearchPageProps {
  searchParams?: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Acessamos o parâmetro 'q' de forma segura, garantindo que ele existe
  const query = searchParams?.q || "";
  const products = await searchProducts(query);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-800 dark:text-white">
          Resultados da Busca
        </h1>
        {query ? (
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
            A exibir resultados para: <span className="font-bold text-cyan-500">"{query}"</span>
          </p>
        ) : (
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-2">
            Por favor, digite um termo para pesquisar.
          </p>
        )}
      </div>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-zinc-500">
            {query ? 'Nenhum produto encontrado para a sua busca.' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
