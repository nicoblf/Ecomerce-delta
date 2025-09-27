// Arquivo: /src/components/ProductGallery.tsx

"use client";

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || '/placeholder.png');

  return (
    <div>
      <div className="relative w-full h-96 rounded-lg bg-zinc-100 dark:bg-zinc-800 mb-4">
        <Image
          src={selectedImage}
          alt={productName}
          fill
          style={{ objectFit: 'contain' }}
          className="p-8 transition-opacity duration-300"
          key={selectedImage}
        />
      </div>
      <div className="flex gap-4">
        {images.map((imgUrl, index) => (
          <div 
            key={index}
            onClick={() => setSelectedImage(imgUrl)}
            className={`relative w-24 h-24 rounded-md bg-zinc-100 dark:bg-zinc-800 cursor-pointer border-2 transition-colors ${selectedImage === imgUrl ? 'border-cyan-500' : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'}`}
          >
            <Image
              src={imgUrl}
              alt={`${productName} - view ${index + 1}`}
              fill
              style={{ objectFit: 'contain' }}
              className="p-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
