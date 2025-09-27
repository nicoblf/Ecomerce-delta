// Arquivo: /src/app/minha-conta/seguranca/page.tsx (Código Completo)

"use client";

import { useState } from "react";
import { useApp } from "@/contexts/CartContext";

export default function SegurancaPage() {
  const { token } = useApp(); // Pegamos o token do usuário logado
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("A nova senha e a confirmação não coincidem.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Enviamos o token para o nosso "guarda" de rotas
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });

      const data = await response.json();
      alert(data.message); // Exibe a mensagem de sucesso ou de erro do backend

      if (response.ok) {
        // Limpa os campos após o sucesso
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-zinc-800 dark:text-white mb-6">
        Segurança
      </h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md space-y-4 max-w-lg">
        <div>
          <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Senha Atual</label>
          <input 
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Nova Senha</label>
          <input 
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Confirmar Nova Senha</label>
          <input 
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-md transition-colors duration-300">
          Alterar Senha
        </button>
      </form>
    </div>
  );
}