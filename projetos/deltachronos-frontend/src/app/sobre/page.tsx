// Arquivo: /src/app/sobre/page.tsx (Versão com caminho da imagem corrigido)

import Image from 'next/image';
import { Gem, ShieldCheck, MessageCircle } from 'lucide-react'; 
import Link from 'next/link';

export default function SobrePage() {
  return (
    <div className="bg-white dark:bg-black text-zinc-800 dark:text-zinc-200">
      
      {/* --- SEÇÃO HERO --- */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        {/* --- CORREÇÃO AQUI --- */}
        <Image 
          src="/banners/banner-lifestyle.jpg" // Caminho correto
          alt="Produtos de tecnologia e design na DeltaChronos"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />

        <div className="relative z-20 p-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
            OS MELHORES GADGETS, EM UM SÓ LUGAR.
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-zinc-300">
            Na DeltaChronos, selecionamos a dedo a melhor tecnologia! Sua busca pelo gadget perfeito termina aqui.
          </p>
        </div>
      </section>

      {/* --- O RESTO DA PÁGINA (sem alterações) --- */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Por que comprar na DeltaChronos?</h2>
            <p className="text-zinc-500 mt-2">Nossa promessa é oferecer mais do que produtos: oferecemos confiança.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-lg flex flex-col items-center text-center h-full">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-cyan-500/10 text-cyan-500 mb-6">
                <Gem size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Curadoria de Especialistas</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Nossa equipe testa e aprova cada item. Só vendemos o que usaríamos. Isso garante que você sempre receberá um produto de alta qualidade e com design excepcional.
              </p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-lg flex flex-col items-center text-center h-full">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-cyan-500/10 text-cyan-500 mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Confiança e Segurança</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Seu processo de compra é 100% seguro do início ao fim. Oferecemos garantia em todos os produtos e uma política de devolução simplificada para sua tranquilidade.
              </p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-lg flex flex-col items-center text-center h-full">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-cyan-500/10 text-cyan-500 mb-6">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Atendimento Humanizado</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Tem alguma dúvida? Fale com pessoas de verdade, prontas para ajudar. Nosso suporte está disponível para garantir a melhor experiência antes, durante e após a sua compra.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-zinc-100 dark:bg-zinc-900">
          <div className="container mx-auto px-4 py-16 text-center">
              <h2 className="text-3xl font-bold">Encontre seu próximo gadget favorito.</h2>
              <p className="text-zinc-500 mt-2 mb-6 text-lg">
                  Explore os produtos que nossa equipe de especialistas selecionou para você.
              </p>
              <Link 
                  href="/produtos"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 inline-block"
              >
                  Ver Todos os Produtos
              </Link>
          </div>
      </section>
    </div>
  );
}