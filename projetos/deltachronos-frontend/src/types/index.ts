// Arquivo: /src/types/index.ts

// Esta é a estrutura de um Produto como ele vem da nossa API/base de dados.
export interface Product {
  id: number;
  nome: string;
  categoria: string;
  preco: string; // O preço vem como TEXTO da API.
  descricao?: string;
  estoque?: number;
  image_urls: string[];
}

// Esta é a estrutura de um item DENTRO do nosso carrinho de compras.
// Ele herda do Produto, mas garante que o preço é um NÚMERO para cálculos.
export interface CartItem {
  id: number;
  nome: string;
  categoria: string;
  preco: number; // No carrinho, o preço é um NÚMERO.
  image_urls: string[];
  quantity: number;
}

// Esta é a estrutura do nosso utilizador, como vem do token JWT.
export interface User {
  id: number;
  email: string;
  nome?: string;
  role: string;
}
