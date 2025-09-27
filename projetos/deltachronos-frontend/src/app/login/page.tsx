// Arquivo: /src/app/login/page.tsx (Versão Final com Redirecionamento Inteligente)

"use client";

import { useState, useEffect } from 'react'; // MUDANÇA 1: Importamos o useEffect
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/CartContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  // MUDANÇA 2: Pegamos a função login E o estado de autenticação
  const { login, isAuthenticated } = useApp(); 

  // MUDANÇA 4: CRIAMOS UM useEffect PARA REAGIR À MUDANÇA DE AUTENTICAÇÃO
  useEffect(() => {
    // Se o usuário se tornou autenticado, então redirecione.
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]); // Este efeito roda sempre que 'isAuthenticated' mudar


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // MUDANÇA 3: A função agora só chama o login. Ela não se preocupa mais em redirecionar.
        login(data.token);
        // O redirecionamento agora é responsabilidade do useEffect.
      } else {
        alert(`Erro ao logar: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      alert('Não foi possível conectar ao servidor.');
    }
  };

  return (
    // O JSX do formulário continua o mesmo
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-950 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-zinc-800 dark:text-white">Acesse sua Conta</h1>
        {/* ... O resto do formulário continua aqui, sem alterações ... */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Senha</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>

          <div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-black bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300">
              Entrar
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Não tem uma conta?{' '}
          <Link href="/cadastro" className="font-medium text-cyan-500 hover:text-cyan-400">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}