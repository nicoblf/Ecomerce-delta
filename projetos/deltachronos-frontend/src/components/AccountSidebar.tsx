// Arquivo: /src/components/AccountSidebar.tsx

"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Meus Dados', href: '/minha-conta' },
  { name: 'Meus Pedidos', href: '/minha-conta/pedidos' },
  { name: 'Meus Endereços', href: '/minha-conta/enderecos' },
  { name: 'Segurança', href: '/minha-conta/seguranca' },
];

export function AccountSidebar() {
  const pathname = usePathname(); // Hook para saber qual é a URL atual

  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <nav className="flex flex-col space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-cyan-500 text-black'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}