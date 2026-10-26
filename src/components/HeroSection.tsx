import React from 'react';
import { MessageCircle, ChevronRight, ShieldCheck, Award, MapPin } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData.js';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      aria-label="Apresentação Dutra Automóveis"
      className="relative min-h-[92vh] flex items-center justify-center bg-black overflow-hidden pt-20"
      style={{
        backgroundImage: `url('${COMPANY_DATA.heroBgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      {/* Dark Multi-layer Gradient Overlay for WCAG AAA contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/70 backdrop-brightness-[0.4]" />
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/40 to-black/90 pointer-events-none" />

      {/* Decorative subtle ambient automotive glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center z-10">
        {/* Unboxed Location and Niching Tagline (Constitution Compliant: NO PILL BADGE) */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium tracking-wider text-zinc-300 uppercase mb-6">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <MapPin className="w-4 h-4 text-zinc-400" />
            Santa Maria - RS
          </span>
          <span aria-hidden="true" className="text-zinc-600">
            ·
          </span>
          <span className="text-zinc-400">Concessionária Multimarcas</span>
          <span aria-hidden="true" className="text-zinc-600">
            ·
          </span>
          <span className="text-zinc-400">Centro</span>
        </div>

        {/* The single mandatory H1 on page */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.12] max-w-4xl mb-6 drop-shadow-sm">
          Dutra Automóveis: Seu Próximo Carro Está Aqui.
        </h1>

        {/* Supporting description */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-light leading-relaxed mb-10">
          Veículos novos e seminovos selecionados a dedo com laudo cautelar
          aprovado, transparência inegociável e as melhores condições de
          financiamento e troca de Santa Maria e região.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-16">
          <a
            href={COMPANY_DATA.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fale Conosco via WhatsApp no número 55 99971-4484"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base py-4 px-8 rounded-xl transition-all duration-200 shadow-xl shadow-emerald-950/50 hover:shadow-emerald-900/40 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50"
          >
            <MessageCircle className="w-5 h-5 text-white" />
            <span>Fale Conosco via WhatsApp</span>
          </a>

          <a
            href="#veiculos"
            aria-label="Ver nosso estoque de veículos em destaque"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-100 hover:text-white font-medium text-base py-4 px-7 rounded-xl border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Ver Nosso Estoque</span>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </a>
        </div>

        {/* Credibility proof metrics (unboxed clean editorial presentation) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 pt-8 border-t border-white/10 w-full max-w-3xl text-left sm:text-center">
          <div className="space-y-1">
            <div className="flex items-center sm:justify-center gap-2 text-white">
              <ShieldCheck className="w-5 h-5 text-zinc-300" />
              <span className="font-serif text-xl sm:text-2xl font-bold">100%</span>
            </div>
            <p className="text-xs text-zinc-400">Procedência e Laudo Cautelar</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center sm:justify-center gap-2 text-white">
              <Award className="w-5 h-5 text-zinc-300" />
              <span className="font-serif text-xl sm:text-2xl font-bold">Garantia</span>
            </div>
            <p className="text-xs text-zinc-400">Revisados e com garantia por escrito</p>
          </div>

          <div className="col-span-2 md:col-span-1 space-y-1">
            <div className="flex items-center sm:justify-center gap-2 text-white">
              <MapPin className="w-5 h-5 text-zinc-300" />
              <span className="font-serif text-xl sm:text-2xl font-bold">Tradição</span>
            </div>
            <p className="text-xs text-zinc-400">Rua Serafim Valandro, 1820</p>
          </div>
        </div>
      </div>
    </section>
  );
};
