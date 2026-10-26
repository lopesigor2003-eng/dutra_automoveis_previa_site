import React, { useState } from 'react';
import {
  CheckCircle2,
  Building2,
  FileCheck2,
  HeartHandshake,
  BadgeDollarSign,
  MapPin,
  ExternalLink,
  Maximize2,
  X,
} from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData.js';

export const AboutSection: React.FC = () => {
  const [imgSrc, setImgSrc] = useState(COMPANY_DATA.storefrontImage);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const pillars = [
    {
      icon: FileCheck2,
      title: 'Procedência Rigorosa',
      desc: 'Veículos submetidos a perícia cautelar completa, garantindo histórico limpo, quilometragem real e estrutura intacta.',
    },
    {
      icon: BadgeDollarSign,
      title: 'Compramos Seu Veículo',
      desc: 'Avaliação justa do seu seminovo com base no mercado real e pagamento à vista e imediato.',
    },
    {
      icon: HeartHandshake,
      title: 'Negociação Sem Entrelinhas',
      desc: 'Transparência em cada etapa da negociação, documentação ágil e suporte para transferência imediata.',
    },
    {
      icon: Building2,
      title: 'Estrutura Própria no Centro',
      desc: 'Showroom amplo na Rua Serafim Valandro com equipe dedicada e estacionamento para clientes.',
    },
  ];

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="py-24 bg-zinc-950 relative border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Card in Original Form Factor (3:4 Portrait Ratio matching 3024x4032) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-white/15 bg-zinc-900 shadow-2xl group">
              {/* Image Frame strictly in Original Form Factor (aspect-[3/4]) */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                <img
                  src={imgSrc}
                  alt="Fachada oficial e showroom da Dutra Automóveis na Rua Serafim Valandro, 1820 - Centro, Santa Maria RS"
                  loading="lazy"
                  decoding="async"
                  onError={() => setImgSrc(COMPANY_DATA.storefrontOriginalUrl)}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

                {/* Lightbox / Zoom Action Button */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  aria-label="Visualizar foto da fachada em tela cheia"
                  className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white opacity-90 group-hover:opacity-100"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Glassmorphic Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl backdrop-blur-md bg-black/80 border border-white/15 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Rua Serafim Valandro, 1820
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Centro · Santa Maria - RS
                    </p>
                  </div>
                  <a
                    href={COMPANY_DATA.mapsPlaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir foto oficial e localização no Google Maps"
                    className="ml-auto p-2 text-zinc-400 hover:text-white transition-colors"
                    title="Ver no Google Maps"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Decorative subtle border frame */}
            <div className="hidden sm:block absolute -top-3 -left-3 w-full max-w-md h-full rounded-2xl border border-white/5 -z-10 pointer-events-none" />
          </div>

          {/* Right Column: Text & Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-400">
                Nossa História & Valores
              </span>
              <h2
                id="sobre-title"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
              >
                Sobre a Dutra Automóveis
              </h2>
            </div>

            {/* Exact required statement from prompt */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal bg-zinc-900/40 p-6 rounded-xl border border-white/5">
              Dutra Automóveis é sua concessionária de confiança em Santa
              Maria-RS. Especializada em veículos multimarcas, oferecemos uma
              seleção cuidadosamente curada e a melhor experiência de venda. Com
              transparência e dedicação, ajudamos você a encontrar o carro dos
              seus sonhos e também compramos o seu veículo.
            </p>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <article
                    key={pillar.title}
                    className="p-5 rounded-xl bg-zinc-900/60 border border-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-3">
                      <IconComponent className="w-4 h-4 text-zinc-200" />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-1.5">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-normal">
                      {pillar.desc}
                    </p>
                  </article>
                );
              })}
            </div>

            {/* Quick checkmark bullet list */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-2 text-xs sm:text-sm text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Laudo cautelar 100% aprovado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Troca com troco na hora</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Garantia de 90 dias com opção estendida</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Original Full-Resolution Photo */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Foto em tamanho original da Dutra Automóveis"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in duration-200"
        >
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setIsLightboxOpen(false)}
            aria-hidden="true"
          />

          <div className="relative max-w-3xl max-h-[92vh] flex flex-col items-center">
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between pb-3 text-xs text-zinc-400">
              <span>Fachada Oficial · Rua Serafim Valandro, 1820 (3024 × 4032)</span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Fechar visualização em tela cheia"
                className="p-1.5 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image in Full Native 3:4 Aspect Ratio */}
            <div className="rounded-xl overflow-hidden border border-white/20 shadow-2xl max-h-[82vh] bg-black">
              <img
                src={imgSrc}
                alt="Fachada oficial e showroom da Dutra Automóveis em tamanho original"
                className="max-h-[82vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
