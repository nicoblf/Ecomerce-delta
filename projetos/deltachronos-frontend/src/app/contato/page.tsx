// Arquivo: /src/app/contato/page.tsx

"use client"; // Será um formulário interativo

import { useState } from 'react';

export default function ContatoPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // A lógica para enviar o email para o backend virá no futuro
    alert("Obrigado pelo seu contato! (Função de envio a ser implementada)");
    setNome('');
    setEmail('');
    setMensagem('');
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-800 dark:text-white">
          Fale Connosco
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-4">
          Tem alguma dúvida, sugestão ou proposta? Adoraríamos ouvir você.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-12 max-w-2xl mx-auto space-y-6">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Seu Nome</label>
          <input type="text" id="name" value={nome} onChange={(e) => setNome(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Seu Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Sua Mensagem</label>
          <textarea id="message" value={mensagem} onChange={(e) => setMensagem(e.target.value)} required rows={5} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"></textarea>
        </div>
        <div>
          <button type="submit" className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm font-bold text-black bg-cyan-500 hover:bg-cyan-400 transition-all">
            Enviar Mensagem
          </button>
        </div>
      </form>
    </div>
  );
}
