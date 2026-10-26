import React, { useState, useEffect } from 'react';
import {
  X,
  MessageCircle,
  ExternalLink,
  Fuel,
  Gauge,
  Calendar,
  Sparkles,
  ShieldCheck,
  Check,
  Share2,
  FileText,
  MapPin,
} from 'lucide-react';
import { Vehicle } from '../utils/filterVehicles.js';
import { formatCurrencyBRL, formatKm, calculateMonthlyPayment } from '../utils/financing.js';
import { COMPANY_DATA } from '../data/companyData.js';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  onClose,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [vehicle]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (vehicle) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [vehicle, onClose]);

  if (!vehicle) return null;

  const isSold = vehicle.status === 'Vendido';
  const isMoto = vehicle.category === 'Moto';

  const currentDownPayment = Math.round((vehicle.price * downPaymentPercent) / 100);
  const monthlyPayment48 = calculateMonthlyPayment(
    vehicle.price,
    currentDownPayment,
    48
  );

  const whatsappMessage = encodeURIComponent(
    isSold
      ? `Olá Dutra Automóveis! Vi no site que o(a) ${isMoto ? 'moto' : 'veículo'} ${vehicle.brand} ${vehicle.model} (${vehicle.year}) anunciado por ${formatCurrencyBRL(
          vehicle.price
        )} foi vendido. Vocês têm previsão de novos modelos similares em estoque?`
      : `Olá Dutra Automóveis! Vi no site o(a) ${isMoto ? 'moto' : 'veículo'} ${vehicle.brand} ${vehicle.model} (${vehicle.year}) no valor de ${formatCurrencyBRL(
          vehicle.price
        )} e gostaria de mais informações / agendar uma visita na loja da Serafim Valandro, 1820.`
  );
  const whatsappCarUrl = `${COMPANY_DATA.whatsappUrl}?text=${whatsappMessage}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${vehicle.brand} ${vehicle.model} - Dutra Automóveis`,
        text: `Confira este(a) ${vehicle.brand} ${vehicle.model} na Dutra Automóveis em Santa Maria - RS:`,
        url: vehicle.instagramUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(vehicle.instagramUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const images = vehicle.gallery && vehicle.gallery.length > 0 ? vehicle.gallery : [vehicle.imageUrl];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-vehicle-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-zinc-950 border border-white/15 rounded-2xl shadow-2xl text-white">
        {/* Top Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-zinc-950/95 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
              {vehicle.category}
            </span>
            <span aria-hidden="true" className="text-zinc-600">
              ·
            </span>
            <span className="text-xs text-zinc-400">Ano {vehicle.year}</span>
            <span aria-hidden="true" className="text-zinc-600">
              ·
            </span>
            {isSold ? (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-white/10">
                Vendido
              </span>
            ) : (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Disponível à Venda
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              aria-label="Compartilhar link da publicação oficial"
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar janela de detalhes"
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Main Photo directly from Dutra Automóveis Instagram post */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] sm:aspect-[16/10] rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
              <img
                src={images[activeImageIndex] || vehicle.imageUrl}
                alt={`${vehicle.brand} ${vehicle.model} - Foto do pátio da Dutra Automóveis`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-md text-xs text-zinc-200 border border-white/10 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Foto Real no Showroom · Serafim Valandro, 1820</span>
              </div>
            </div>
          </div>

          {/* Vehicle Title & Pricing Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <p className="text-sm font-semibold tracking-wide uppercase text-zinc-400">
                {vehicle.brand}
              </p>
              <h3
                id="modal-vehicle-title"
                className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight"
              >
                {vehicle.model}
              </h3>
              <p className="text-sm text-zinc-300 mt-1">{vehicle.version}</p>
            </div>

            <div className="sm:text-right">
              <span className="text-xs text-zinc-400 block">Preço anunciado</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {formatCurrencyBRL(vehicle.price)}
              </span>
              <span className="text-xs text-emerald-400 block mt-0.5">Aceitamos troca</span>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Ano / Modelo</span>
              </div>
              <p className="font-semibold text-sm text-white">{vehicle.year}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Gauge className="w-3.5 h-3.5" />
                <span>Quilometragem</span>
              </div>
              <p className="font-semibold text-sm text-white">
                {formatKm(vehicle.mileage)}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Transmissão</span>
              </div>
              <p className="font-semibold text-sm text-white">
                {vehicle.transmission}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/10">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Fuel className="w-3.5 h-3.5" />
                <span>Combustível</span>
              </div>
              <p className="font-semibold text-sm text-white">{vehicle.fuel}</p>
            </div>
          </div>

          {/* Real Instagram Post Information Box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-zinc-400" />
                <span>Informações Originais da Publicação</span>
              </h4>
              <a
                href={vehicle.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                <span>Ver post no Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900/60 border border-white/10 space-y-3">
              <p className="text-sm text-zinc-200 leading-relaxed font-mono whitespace-pre-line text-xs sm:text-sm">
                {vehicle.rawCaption || vehicle.description}
              </p>
            </div>
          </div>

          {/* Opcionais & Destaques */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Itens & Destaques de Série
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {vehicle.features.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 text-xs text-zinc-300 p-2.5 rounded-lg bg-zinc-900/50 border border-white/5"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Financing Simulation Box */}
          {!isSold && (
            <div className="p-5 rounded-xl bg-zinc-900/90 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Simulação de Financiamento
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Entrada de {downPaymentPercent}% ({formatCurrencyBRL(currentDownPayment)})
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-zinc-400">48x de aprox.</span>
                  <p className="text-base sm:text-lg font-bold text-white">
                    {formatCurrencyBRL(monthlyPayment48)}/mês
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <input
                  type="range"
                  min="10"
                  max="80"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  aria-label="Porcentagem de entrada para simulação"
                  className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <a
              href={whatsappCarUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Negociar ${vehicle.brand} ${vehicle.model} via WhatsApp`}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-emerald-950/50"
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                {isSold ? 'Consultar Modelo Similar no WhatsApp' : 'Falar com Consultor no WhatsApp'}
              </span>
            </a>

            <a
              href={vehicle.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver publicação oficial no Instagram da Dutra Automóveis"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs font-medium py-3.5 px-5 rounded-xl border border-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver no Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
