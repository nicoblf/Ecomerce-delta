// Arquivo: /src/app/minha-conta/pedidos/page.tsx

"use client";

export default function MeusPedidosPage() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-zinc-800 dark:text-white mb-6">
        Meus Pedidos
      </h1>
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md">
        <p className="text-zinc-600 dark:text-zinc-400 text-center py-8">
          Você ainda não fez nenhum pedido.
        </p>
        {/* No futuro, aqui listaremos os pedidos do usuário vindos do banco de dados */}
      </div>
    </div>
  );
}