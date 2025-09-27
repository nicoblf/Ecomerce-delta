import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AppProvider } from "@/contexts/CartContext"; // Nome atualizado
import { CartPanel } from "@/components/CartPanel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeltaChronos",
  description: "A mudança que você veste.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-white dark:bg-zinc-900`}>
        {/* Usamos o nome atualizado aqui */}
        <AppProvider>
          <Header />
          <CartPanel />
          <main>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}