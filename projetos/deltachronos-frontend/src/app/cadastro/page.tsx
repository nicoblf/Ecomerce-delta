// Arquivo: /src/app/cadastro/page.tsx (Versão Final com Conexão API)

"use client";

import { useState } from 'react';
import Link from 'next/link';

type AccountType = 'fisica' | 'juridica';

export default function CadastroPage() {
  const [accountType, setAccountType] = useState<AccountType>('fisica');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // MUDANÇA 1: A FUNÇÃO AGORA É ASSÍNCRONA E FAZ A REQUISIÇÃO
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return; 
    }

    // Montamos o corpo da requisição de acordo com o tipo de conta
    const baseData = { email, password, phone, accountType };
    let requestBody;
    if (accountType === 'fisica') {
      requestBody = { ...baseData, name, cpf, birthDate, gender };
    } else {
      requestBody = { ...baseData, companyName, cnpj };
    }

    try {
      // Usamos o 'fetch' para enviar os dados para o nosso backend
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Pegamos a resposta do backend
      const data = await response.json();

      if (response.ok) {
        // Se a resposta for bem-sucedida (status 201)
        alert(data.message); // Exibe "Usuário criado com sucesso!"
        // Futuramente, podemos redirecionar o usuário para a página de login
        // window.location.href = '/login';
      } else {
        // Se o backend retornar um erro (ex: email já existe)
        alert(`Erro ao cadastrar: ${data.message}`);
      }
    } catch (error) {
      // Se houver um erro de rede (ex: backend desligado)
      console.error('Erro de conexão:', error);
      alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    }
  };

  return (
    // O restante do código JSX do formulário continua exatamente o mesmo
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">Crie sua Conta</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Complete seus dados para uma experiência personalizada.</p>
        </div>
        
        <div className="flex justify-center gap-6 pt-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="accountType" value="fisica" checked={accountType === 'fisica'} onChange={() => setAccountType('fisica')} className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
            <span className="text-zinc-700 dark:text-zinc-300">Pessoa Física</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="accountType" value="juridica" checked={accountType === 'juridica'} onChange={() => setAccountType('juridica')} className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800" />
            <span className="text-zinc-700 dark:text-zinc-300">Pessoa Jurídica</span>
          </label>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {accountType === 'fisica' && (
            <>
              <div>
                <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Nome Completo</label>
                <input id="name" type="text" required={accountType === 'fisica'} value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cpf" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">CPF</label>
                  <input id="cpf" type="text" required={accountType === 'fisica'} placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                <div>
                  <label htmlFor="birthDate" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Data de Nascimento</label>
                  <input id="birthDate" type="date" required={accountType === 'fisica'} value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
              </div>
            </>
          )}
          {accountType === 'juridica' && (
            <>
              <div>
                <label htmlFor="companyName" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Razão Social</label>
                <input id="companyName" type="text" required={accountType === 'juridica'} value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
              </div>
              <div>
                <label htmlFor="cnpj" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">CNPJ</label>
                <input id="cnpj" type="text" required={accountType === 'juridica'} placeholder="00.000.000/0001-00" value={cnpj} onChange={(e) => setCnpj(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
              </div>
            </>
          )}
          <div>
            <label htmlFor="phone" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Telefone de Contato</label>
            <input id="phone" type="tel" required placeholder="(11) 99999-9999" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email de Acesso</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Senha</label>
              <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
            </div>
            <div>
              <label htmlFor="confirm-password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Confirme sua Senha</label>
              <input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
            </div>
          </div>
          
          <div><button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-black bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300">Criar Conta</button></div>
        </form>

        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">Já tem uma conta?{' '}<Link href="/login" className="font-medium text-cyan-500 hover:text-cyan-400">Faça login</Link></p>
      </div>
    </div>
  );
}