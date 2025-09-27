// Arquivo: /src/app/minha-conta/page.tsx

"use client";

import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

// A interface para os dados do perfil
interface ProfileData {
  nome?: string;
  email?: string;
  cpf?: string;
  telefone?: string;
  data_nascimento?: string;
  tipo_conta?: 'fisica' | 'juridica';
  razao_social?: string;
  cnpj?: string;
}

export default function MeusDadosPage() {
  const { token, isLoading: authIsLoading, isAuthenticated } = useApp();
  const router = useRouter();
  
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({});

  const fetchProfile = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    // Não precisa de setIsLoading(true) aqui, pois já começa como true
    try {
      const response = await fetch('http://localhost:3001/api/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setFormData(data);
      } else {
        console.error("Falha ao buscar perfil, o servidor respondeu com um erro.");
      }
    } catch (error) {
      console.error("Erro de rede ao buscar perfil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authIsLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        fetchProfile();
      }
    }
  }, [authIsLoading, isAuthenticated, token, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!token) return;
    try {
      const response = await fetch('http://localhost:3001/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        setProfileData(data.user);
        setFormData(data.user);
        setIsEditing(false);
      }
    } catch (error) {
      alert('Erro ao salvar os dados.');
    }
  };

  const maskCpf = (cpf: string | null | undefined) => {
    if (!cpf) return 'Não informado';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '***.$2.$3-**');
  };

  if (isLoading) {
    return (
        <div className="flex justify-center items-center py-20">
            <div className="text-lg">Carregando seus dados...</div>
        </div>
    );
  }
  
  if (!profileData) {
    return (
        <div className="flex justify-center items-center py-20">
            <div className="text-lg text-red-500">Não foi possível carregar os seus dados. Por favor, tente fazer login novamente.</div>
        </div>
    );
  }

  return (
    <div>
      {/* ESTE É O BLOCO QUE PRECISAMOS GARANTIR QUE ESTÁ CORRETO */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-zinc-800 dark:text-white">Meus Dados</h1>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-md">
            Editar
          </button>
        )}
      </div>

      {isEditing ? (
        // MODO DE EDIÇÃO
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="text-sm font-bold text-zinc-500">Nome / Razão Social</label>
            <input type="text" name={profileData.tipo_conta === 'fisica' ? 'nome' : 'razao_social'} value={formData.nome || formData.razao_social || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md"/>
          </div>
          <div>
            <label className="text-sm font-bold text-zinc-500">Email de Acesso (não pode ser alterado)</label>
            <p className="text-lg text-zinc-500 dark:text-zinc-400">{profileData.email}</p>
          </div>
          <div>
            <label className="text-sm font-bold text-zinc-500">Telefone</label>
            <input type="tel" name="telefone" value={formData.telefone || ''} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md"/>
          </div>
          <div className="flex gap-4 pt-4">
            <button onClick={handleSave} className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-md">Salvar</button>
            <button onClick={() => setIsEditing(false)} className="bg-zinc-500 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded-md">Cancelar</button>
          </div>
        </div>
      ) : (
        // MODO DE VISUALIZAÇÃO
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="text-sm font-bold text-zinc-500">{profileData.tipo_conta === 'fisica' ? 'Nome Completo' : 'Razão Social'}</label>
            <p className="text-lg text-zinc-800 dark:text-white">{profileData.nome || profileData.razao_social || 'Não informado'}</p>
          </div>
          <div>
            <label className="text-sm font-bold text-zinc-500">Email de Acesso</label>
            <p className="text-lg text-zinc-800 dark:text-white">{profileData.email}</p>
          </div>
          <div>
            <label className="text-sm font-bold text-zinc-500">{profileData.tipo_conta === 'fisica' ? 'CPF' : 'CNPJ'}</label>
            <p className="text-lg text-zinc-800 dark:text-white">{maskCpf(profileData.cpf) || profileData.cnpj || 'Não informado'}</p>
          </div>
          <div>
            <label className="text-sm font-bold text-zinc-500">Telefone</label>
            <p className="text-lg text-zinc-800 dark:text-white">{profileData.telefone || 'Não informado'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
