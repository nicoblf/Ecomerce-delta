// Arquivo: src/components/PromoBanner.tsx

import Link from "next/link";

export function PromoBanner() {
    return (
        <section className="bg-cyan-500">
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl font-extrabold text-black">Oferta Especial da Semana</h2>
                <p className="text-zinc-800 mt-2 mb-6 text-lg">
                    Toda a linha de Fones Chronos-Air com **25% de desconto** e Frete Grátis!
                </p>
                <Link 
                    href="/produtos/fones"
                    className="bg-black hover:bg-zinc-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 inline-block"
                >
                    Aproveitar Agora
                </Link>
            </div>
        </section>
    );
}