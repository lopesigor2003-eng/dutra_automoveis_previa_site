import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData.js';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="Atendimento rápido via WhatsApp" className="fixed bottom-6 right-6 z-40">
      <a
        href={COMPANY_DATA.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversa no WhatsApp com a Dutra Automóveis"
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-950/80 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
      >
        {/* Subtle ping pulse */}
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30 animate-ping pointer-events-none"
          aria-hidden="true"
        />

        <MessageCircle className="w-7 h-7 relative z-10" />

        {/* Hover Tooltip */}
        <span
          role="tooltip"
          className="hidden sm:block absolute right-full mr-3 px-3 py-1.5 bg-zinc-950 text-white text-xs font-semibold rounded-lg shadow-xl border border-white/10 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200"
        >
          Fale Conosco no WhatsApp
        </span>
      </a>
    </aside>
  );
};
