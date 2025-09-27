// Arquivo: /src/app/minha-conta/layout.tsx

import { AccountSidebar } from "@/components/AccountSidebar";

export default function MinhaContaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Coluna do Menu Lateral */}
        <AccountSidebar />

        {/* Coluna do Conteúdo da Página (que será trocado) */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}