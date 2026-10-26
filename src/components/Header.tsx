import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, Car, MapPin, Clock } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData.js';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#hero' },
    { name: 'Sobre Nós', href: '#sobre' },
    { name: 'Estoque', href: '#veiculos' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-black/90 via-black/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            aria-label="Dutra Automóveis - Página inicial"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/20 flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-inner">
              <Car className="w-5 h-5 text-zinc-100" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                DUTRA
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-medium">
                Automóveis
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Navegação Principal"
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${COMPANY_DATA.phoneRaw}`}
              aria-label={`Ligar para ${COMPANY_DATA.phoneFormatted}`}
              className="flex items-center gap-2 text-xs text-zinc-300 hover:text-white transition-colors py-2 px-3 rounded-md hover:bg-white/5"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span>{COMPANY_DATA.phoneFormatted}</span>
            </a>
            <a
              href={COMPANY_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fale Conosco via WhatsApp da Dutra Automóveis"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-emerald-950/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu móvel"
          className="md:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-white/10 px-6 pt-4 pb-8 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-base font-medium text-zinc-200 hover:text-white hover:bg-white/5 px-3 rounded-md transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="text-xs text-zinc-400 flex items-center gap-2 px-1">
              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
              <span>Serafim Valandro, 1820 - Centro, Santa Maria - RS</span>
            </div>
            <div className="text-xs text-zinc-400 flex items-center gap-2 px-1">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>{COMPANY_DATA.hours}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={`tel:${COMPANY_DATA.phoneRaw}`}
                aria-label={`Ligar para ${COMPANY_DATA.phoneFormatted}`}
                className="flex items-center justify-center gap-2 bg-zinc-900 border border-white/15 text-white text-xs font-semibold py-3 px-3 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <Phone className="w-4 h-4 text-zinc-300" />
                <span>Ligar Agora</span>
              </a>
              <a
                href={COMPANY_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar no WhatsApp"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-3 px-3 rounded-lg transition-colors shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
