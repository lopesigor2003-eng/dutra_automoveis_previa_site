import React from 'react';
import {
  Car,
  BadgeDollarSign,
  UserCheck,
  CreditCard,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import { FinancingCalculator } from './FinancingCalculator.js';
import { COMPANY_DATA } from '../data/companyData.js';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Car,
      title: 'Venda de Veículos Multimarcas',
      subtitle: 'Seminovos e Usados Selecionados',
      description:
        'Catálogo com os modelos mais procurados do mercado automotivo. Todos os veículos contam com laudo pericial cautelar, histórico veicular conferido e garantia de procedência.',
      highlights: [
        'Inspeção mecânica e estética completa',
        'Veículos higienizados e polidos',
        'Garantia por escrito de motor e câmbio',
      ],
      ctaText: 'Ver Veículos Disponíveis',
      ctaHref: '#veiculos',
    },
    {
      icon: BadgeDollarSign,
      title: 'Compra de Veículos Usados',
      subtitle: 'Avaliação Justa e Pagamento à Vista',
      description:
        'Quer vender o seu automóvel com rapidez e segurança total? Compramos o seu seminovo com pagamento imediato via PIX, quitamos financiamento pendente e assumimos a transferência.',
      highlights: [
        'Avaliação presencial em minutos',
        'Pagamento seguro e sem burocracia',
        'Troca com troco garantida',
      ],
      ctaText: 'Avaliar Meu Veículo no WhatsApp',
      ctaHref: `https://wa.me/5555999714484?text=${encodeURIComponent(
        'Olá! Gostaria de uma avaliação para vender o meu veículo na Dutra Automóveis.'
      )}`,
    },
    {
      icon: UserCheck,
      title: 'Consultoria Personalizada',
      subtitle: 'Atendimento VIP Sob Medida',
      description:
        'Não sabe qual o carro ideal para a sua rotina ou para a família? Nossa equipe entende suas necessidades de espaço, consumo, segurança e orçamento para indicar a melhor opção.',
      highlights: [
        'Orientação técnica imparcial',
        'Busca sob encomenda de modelos específicos',
        'Apoio em documentação e transferência no Detran-RS',
      ],
      ctaText: 'Falar com Consultor Especialista',
      ctaHref: COMPANY_DATA.whatsappUrl,
    },
    {
      icon: CreditCard,
      title: 'Financiamento Facilitado',
      subtitle: 'Melhores Taxas e Aprovação Rápida',
      description:
        'Parcerias diretas com as maiores instituições financeiras do país: Santander, BV Financeira, Itaú, Bradesco, Pan e Omni. Condições com ou sem entrada.',
      highlights: [
        'Planos em até 60 parcelas fixas',
        'Aprovação rápida para autônomos e assalariados',
        'Possibilidade de incluir seguro e IPVA no contrato',
      ],
      ctaText: 'Simular Financiamento Abaixo',
      ctaHref: '#simulador-financiamento',
    },
  ];

  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="py-24 bg-zinc-950 relative border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-400">
            Soluções Automotivas Completas
          </span>
          <h2
            id="servicos-title"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            Nossos Serviços
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Da escolha do modelo ideal à aprovação do crédito e transferência:
            cuidamos de cada detalhe para que sua experiência seja ágil,
            transparente e sem burocracia.
          </p>
        </div>

        {/* 4 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-zinc-200" />
                  </div>

                  <div>
                    <span className="text-xs font-medium text-zinc-400 block mb-1">
                      {service.subtitle}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed font-light">
                    {service.description}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-white/5">
                    {service.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 text-xs text-zinc-300"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5">
                  <a
                    href={service.ctaHref}
                    aria-label={`${service.ctaText} para ${service.title}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-zinc-300 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Interactive Financing Simulator Widget */}
        <div id="simulador-financiamento">
          <FinancingCalculator />
        </div>
      </div>
    </section>
  );
};
