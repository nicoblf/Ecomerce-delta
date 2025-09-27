// Arquivo: /src/data/products.ts

// Esta é a interface que define o "formato" de cada produto.
// Agora ela corresponde à nossa base de dados.
export interface Product {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  image_urls: string[];
}

// Nossa lista de produtos com os nomes das propriedades corrigidos
export const featuredProducts: Product[] = [
  { 
    id: 1, 
    nome: "Smartwatch Delta-S", 
    categoria: "Smartwatch", 
    preco: 349.90, 
    image_urls: ["/products/watch-1.png", "/products/watch-1-angle.png", "/products/watch-1-side.png"] 
  },
  { 
    id: 2, 
    nome: "Fone Chronos-X", 
    categoria: "Fone Bluetooth", 
    preco: 199.90, 
    image_urls: ["/products/fone-1.png"] 
  },
  { 
    id: 3, 
    nome: "Smartwatch Delta-Pro", 
    categoria: "Smartwatch", 
    preco: 499.90, 
    image_urls: ["/products/watch-2.png"] 
  },
  { 
    id: 4, 
    nome: "Fone Chronos-Air", 
    categoria: "Fone Bluetooth", 
    preco: 249.90, 
    image_urls: ["/products/fone-2.png"] 
  },
];
