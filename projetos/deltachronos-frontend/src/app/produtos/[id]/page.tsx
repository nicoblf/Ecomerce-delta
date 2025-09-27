// Arquivo: /src/app/produtos/[id]/page.tsx

import type { Product } from '@/types';
import { ProductGallery } from '@/components/ProductGallery';
import { AddToCartControls } from '@/components/AddToCartControls';

async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`http://localhost:3001/api/products/${id}`, { cache: 'no-store' });
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    return <div className="text-center py-20">Produto não encontrado.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <ProductGallery images={product.image_urls} productName={product.nome} />
        <div>
          <h2 className="text-sm font-bold uppercase text-zinc-500 dark:text-zinc-400">{product.categoria}</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold my-2 text-zinc-800 dark:text-white">{product.nome}</h1>
          <p className="text-3xl font-semibold text-cyan-500 mb-6">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(product.preco))}
          </p>
          <p className="text-zinc-600 dark:text-zinc-300 mb-8 leading-relaxed">
            {product.descricao || 'Descrição não disponível.'}
          </p>
          <AddToCartControls product={product} />
        </div>
      </div>
    </div>
  );
}
