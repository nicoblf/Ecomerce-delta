// Arquivo: /src/app/minha-conta/enderecos/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/CartContext';

// Interface para definir o formato de um endereço
interface Address {
  id: number;
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

// Interface para os campos do formulário
interface AddressFormState {
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

const initialFormState: AddressFormState = {
  cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: ''
};

export default function MeusEnderecosPage() {
  const { token } = useApp();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<AddressFormState>(initialFormState);

  // Função para buscar os endereços do utilizador
  const fetchAddresses = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/user/addresses', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      }
    } catch (error) {
      console.error("Erro ao buscar endereços:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Busca os endereços quando a página carrega
  useEffect(() => {
    fetchAddresses();
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para adicionar um novo endereço
  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const response = await fetch('http://localhost:3001/api/user/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Endereço adicionado com sucesso!');
        setFormData(initialFormState); // Limpa o formulário
        setShowForm(false); // Esconde o formulário
        fetchAddresses(); // Atualiza a lista de endereços
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
    }
  };
  
  // Função para apagar um endereço
  const handleDeleteAddress = async (addressId: number) => {
    if (!token || !window.confirm("Tem a certeza que quer apagar este endereço?")) return;
    try {
      const response = await fetch(`http://localhost:3001/api/user/addresses/${addressId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        fetchAddresses(); // Atualiza a lista
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
    }
  };

  if (isLoading) {
    return <div>A carregar os seus endereços...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-zinc-800 dark:text-white">Meus Endereços</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-md">
            Adicionar Novo Endereço
          </button>
        )}
      </div>

      {/* RENDERIZAÇÃO CONDICIONAL: Mostra o formulário ou a lista de endereços */}
      {showForm ? (
        // Formulário para adicionar novo endereço
        <form onSubmit={handleAddAddress} className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-bold text-zinc-500">CEP</label>
              <input name="cep" value={formData.cep} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md"/>
            </div>
            <div className="col-span-2">
              <label className="text-sm font-bold text-zinc-500">Rua</label>
              <input name="rua" value={formData.rua} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md"/>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-bold text-zinc-500">Número</label>
              <input name="numero" value={formData.numero} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md"/>
            </div>
            <div className="col-span-2">
              <label className="text-sm font-bold text-zinc-500">Complemento (Opcional)</label>
              <input name="complemento" value={formData.complemento} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md"/>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-bold text-zinc-500">Bairro</label>
              <input name="bairro" value={formData.bairro} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md"/>
            </div>
            <div>
              <label className="text-sm font-bold text-zinc-500">Cidade</label>
              <input name="cidade" value={formData.cidade} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md"/>
            </div>
            <div>
              <label className="text-sm font-bold text-zinc-500">Estado (UF)</label>
              <input name="estado" value={formData.estado} onChange={handleInputChange} required maxLength={2} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md"/>
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button type="submit" className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-md">Salvar Endereço</button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-zinc-500 hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded-md">Cancelar</button>
          </div>
        </form>
      ) : (
        // Lista de endereços existentes
        <div className="space-y-4">
          {addresses.length > 0 ? (
            addresses.map(address => (
              <div key={address.id} className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-md flex justify-between items-start">
                <div>
                  <p className="font-bold">{address.rua}, {address.numero}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{address.bairro} - {address.cidade}, {address.estado}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{address.cep}</p>
                </div>
                <button onClick={() => handleDeleteAddress(address.id)} className="text-zinc-400 hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md text-center">
              <p className="text-zinc-600 dark:text-zinc-400">Nenhum endereço cadastrado.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
