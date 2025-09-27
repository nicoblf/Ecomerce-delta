// Arquivo: /src/app/produtos/page.tsx

import type { Product } from "@/types";
import { ProductGrid } from "@/components/ProductGrid";
import { FilterSidebar } from "@/components/FilterSidebar";

// Esta função busca os produtos, passando os filtros e ordenação para a API
async function getProducts(
  searchParams: { [key: string]: string | string[] | undefined }
): Promise<Product[]> {
  
  const params = new URLSearchParams();

  if (searchParams.sort) {
    params.set('sort', String(searchParams.sort));
  }
  if (searchParams.price) {
    params.set('price', String(searchParams.price));
  }
  if (searchParams.category) {
    const categories = Array.isArray(searchParams.category) 
      ? searchParams.category 
      : [searchParams.category];
    categories.forEach(cat => params.append('category', cat));
  }
  
  const url = `http://localhost:3001/api/products?${params.toString()}`;
  console.log("Frontend buscando produtos na URL:", url);

  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}

// A página recebe os searchParams da URL e os passa para a função de busca
export default async function ProdutosPage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  const products = await getProducts(searchParams);
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Título com o novo estilo atrativo */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          Todos os Nossos Produtos
        </h1>
        <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Explore a nossa coleção completa de tecnologia e design, feita para o seu ritmo.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Componente da Sidebar de Filtros */}
        <FilterSidebar />

        {/* Componente da Grade de Produtos */}
        <div className="w-full md:w-3/4 lg:w-4/5">
            <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}