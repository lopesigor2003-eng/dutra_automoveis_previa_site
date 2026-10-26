import React from 'react';
import { Star, Quote, ExternalLink, CheckCircle } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData.js';
import { COMPANY_DATA } from '../data/companyData.js';

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-title"
      className="py-24 bg-black relative border-t border-zinc-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-400">
              Credibilidade Comprovada
            </span>
            <h2
              id="depoimentos-title"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
            >
              O Que Nossos Clientes Dizem
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
              A satisfação de quem realizou o sonho do carro novo ou vendeu com
              segurança na Dutra Automóveis em Santa Maria - RS.
            </p>
          </div>

          {/* Google Reviews Badge */}
          <a
            href={COMPANY_DATA.mapsPlaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver todas as avaliações no perfil oficial do Google Maps"
            className="flex items-center gap-4 p-4 rounded-xl bg-zinc-950 border border-white/15 hover:border-white/30 transition-all group shrink-0"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold text-white">4.9</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <span className="text-[11px] text-zinc-400 mt-0.5">
                Avaliado no Google Maps
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors ml-2" />
          </a>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS_DATA.map((item) => (
            <article
              key={item.id}
              className="p-6 sm:p-7 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl relative group"
            >
              <div className="space-y-4">
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div
                    className="flex text-amber-400 gap-0.5"
                    aria-label={`Avaliação: ${item.rating} de 5 estrelas`}
                  >
                    {[...Array(item.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  "{item.content}"
                </p>
              </div>

              {/* Author & Vehicle Footer */}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {item.authorName}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                    <span>{item.role}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.location}</span>
                  </div>
                </div>

                {item.vehiclePurchased && (
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400/90 font-medium pt-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Veículo: {item.vehiclePurchased}</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
