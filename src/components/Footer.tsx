import React from 'react';
import {
  Car,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  ExternalLink,
  ChevronUp,
} from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData.js';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      aria-label="Rodapé institucional"
      className="bg-black text-white border-t border-zinc-900 pt-16 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#hero"
              aria-label="Voltar ao início da página Dutra Automóveis"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-1 w-fit"
            >
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/20 flex items-center justify-center text-white">
                <Car className="w-5 h-5 text-zinc-100" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-white">
                  DUTRA
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-medium">
                  Automóveis
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Concessionária multimarcas de referência em Santa Maria - RS.
              Comércio e consultoria de veículos seminovos e usados selecionados
              com garantia e procedência periciada.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_DATA.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Siga a Dutra Automóveis no Instagram"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
              </a>
              <a
                href={COMPANY_DATA.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Curta a Dutra Automóveis no Facebook"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-400" />
              </a>
              <a
                href={COMPANY_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Converse pelo WhatsApp da Dutra Automóveis"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a
                  href="#hero"
                  className="hover:text-white transition-colors"
                >
                  Início (Home)
                </a>
              </li>
              <li>
                <a
                  href="#sobre"
                  className="hover:text-white transition-colors"
                >
                  Sobre a Dutra Automóveis
                </a>
              </li>
              <li>
                <a
                  href="#veiculos"
                  className="hover:text-white transition-colors"
                >
                  Nosso Estoque de Veículos
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  className="hover:text-white transition-colors"
                >
                  Nossos Serviços
                </a>
              </li>
              <li>
                <a
                  href="#depoimentos"
                  className="hover:text-white transition-colors"
                >
                  Depoimentos de Clientes
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="hover:text-white transition-colors"
                >
                  Fale Conosco & Localização
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Informações de Contato
            </h3>
            <ul className="space-y-3 text-xs text-zinc-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                <a
                  href={COMPANY_DATA.mapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>{COMPANY_DATA.address}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 shrink-0" />
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-zinc-500 shrink-0" />
                <a
                  href={`tel:${COMPANY_DATA.phoneRaw}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_DATA.phoneFormatted}
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href={COMPANY_DATA.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  WhatsApp: +55 55 99971-4484
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                <span>{COMPANY_DATA.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with mandatory exact copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 Dutra Automóveis. Todos os direitos reservados.</p>

          <div className="flex items-center gap-4">
            <span>Santa Maria - RS</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Voltar ao topo da página"
              className="inline-flex items-center gap-1 hover:text-zinc-200 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded p-1"
            >
              <span>Topo</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
