// Arquivo: src/components/ProductCard.tsx

import type { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(parseFloat(product.preco));

  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <Link href={`/produtos/${product.id}`} className="block">
        <div className="w-full h-56 relative">
          <Image
            src={product.image_urls?.[0] || '/placeholder.png'}
            alt={product.nome}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{product.categoria}</p>
          <h3 className="font-bold text-lg text-zinc-800 dark:text-white truncate" title={product.nome}>
            {product.nome}
          </h3>
          
          <div className="flex-grow mt-2">
            <p className="text-xl font-semibold text-cyan-500">{formattedPrice}</p>
          </div>

          <div className="mt-4">
            <button className="w-full bg-zinc-800 dark:bg-zinc-700 text-white font-bold py-2 rounded-md transition-colors duration-300 group-hover:bg-cyan-500 group-hover:dark:bg-cyan-600">
              Ver
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}