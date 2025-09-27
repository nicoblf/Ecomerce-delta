// Arquivo: /src/app/page.tsx

// Componentes do seu projeto
import { ProductCard } from "@/components/ProductCard";
import { HeroCarousel } from "@/components/HeroCarousel";
import { FeaturedCategories } from "@/components/FeaturedCategories"; // Importado
import { PromoBanner } from "@/components/PromoBanner";             // Importado

// Tipos e Funções
import type { Product } from "@/types";
async function getFeaturedProducts(): Promise<Product[]> {
  try {
    // A porta 3001 é um exemplo, use a porta da sua API
    const response = await fetch('http://localhost:3001/api/products', { cache: 'no-store' });
    if (!response.ok) return [];
    const allProducts: Product[] = await response.json();
    return allProducts.slice(0, 4); // Pega apenas os 4 primeiros como destaque
  } catch (error) {
    console.error("Erro ao buscar produtos em destaque:", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main>
      <HeroCarousel />
      
      {/* --- NOVA SEÇÃO DE CATEGORIAS --- */}
      <FeaturedCategories />

      {/* --- SEÇÃO DE DESTAQUES (EXISTENTE) --- */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-zinc-800 dark:text-white mb-12">Nossos Destaques</h2>
          
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 mt-8">Não foi possível carregar os produtos em destaque no momento.</p>
          )}
        </div>
      </section>

      {/* --- NOVO BANNER PROMOCIONAL --- */}
      <PromoBanner />

    </main>
  );
}