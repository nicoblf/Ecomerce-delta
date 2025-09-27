// Arquivo: /src/components/HeroCarousel.tsx

"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

// Lista dos nossos banners. Podemos adicionar mais no futuro.
const banners = [
  {
    src: '/banners/banner-1.jpg',
    alt: 'Banner promocional de um smartwatch Delta-S Series',
    title: 'Delta-S Series',
    subtitle: 'O Futuro no Seu Pulso.',
    buttonText: 'Descubra Agora',
    href: '/produtos/1'
  },
  {
    src: '/banners/banner-2.jpg',
    alt: 'Banner promocional de fones de ouvido Chronos-X',
    title: 'Chronos-X Audio',
    subtitle: 'Silencie o Mundo. Ouça a Música.',
    buttonText: 'Conheça a Linha',
    href: '/produtos'
  },
  {
    src: '/banners/banner-3.jpg',
    alt: 'Banner de estilo de vida com tecnologia vestível',
    title: 'Tecnologia que Acompanha',
    subtitle: 'O Seu Ritmo.',
    buttonText: 'Ver Coleção',
    href: '/produtos'
  }
];

export function HeroCarousel() {
  // Usamos o hook do Embla, ativando o plugin de autoplay
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {banners.map((banner, index) => (
          <div className="embla__slide" key={index}>
            <div className="relative w-full h-[270px] md:h-[400px] lg:h-[500px]">
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                style={{ objectFit: 'cover' }}
                priority={index === 0} // Otimiza o carregamento do primeiro banner
              />
              {/* Overlay escuro para melhor legibilidade do texto */}
              <div className="absolute inset-0 bg-black/40"></div>
              
              {/* Conteúdo do Banner */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
                <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
                  {banner.title}
                </h2>
                <p className="text-lg md:text-2xl mt-2 drop-shadow-lg">
                  {banner.subtitle}
                </p>
                <a 
                  href={banner.href}
                  className="mt-6 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  {banner.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
