import React, { useState } from 'react';
import { MessageCircle, Eye, ExternalLink, Calendar, Gauge, Fuel, CheckCircle, Tag } from 'lucide-react';
import { Vehicle } from '../utils/filterVehicles.js';
import { formatCurrencyBRL, formatKm } from '../utils/financing.js';
import { COMPANY_DATA } from '../data/companyData.js';

interface VehicleCardProps {
  vehicle: Vehicle;
  onOpenDetails: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onOpenDetails,
}) => {
  const [imageError, setImageError] = useState(false);

  const fallbackImage =
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';

  const isSold = vehicle.status === 'Vendido';
  const isMoto = vehicle.category === 'Moto';

  const whatsappMessage = encodeURIComponent(
    isSold
      ? `Olá Dutra Automóveis! Vi no site que o veículo/moto ${vehicle.brand} ${vehicle.model} (${vehicle.year}) foi vendido. Vocês têm alguma previsão ou modelo similar em estoque?`
      : `Olá Dutra Automóveis! Vi no site o(a) ${isMoto ? 'moto' : 'veículo'} ${vehicle.brand} ${vehicle.model} (${vehicle.year}) anunciado(a) por ${formatCurrencyBRL(
          vehicle.price
        )} e gostaria de mais informações.`
  );
  const whatsappUrl = `${COMPANY_DATA.whatsappUrl}?text=${whatsappMessage}`;

  return (
    <article className="group flex flex-col rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-zinc-900/50 hover:-translate-y-1">
      {/* Vehicle / Moto Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
        <img
          src={imageError ? fallbackImage : vehicle.imageUrl}
          alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year} na Dutra Automóveis em Santa Maria RS`}
          loading="lazy"
          decoding="async"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

        {/* Kicker in Top Left: Category & Status */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-200 drop-shadow-md">
            {vehicle.category}
            <span aria-hidden="true" className="mx-1.5 opacity-60">
              ·
            </span>
            {vehicle.year}
          </span>
          {isSold ? (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800/90 text-zinc-300 border border-white/10 backdrop-blur-md">
              Vendido
            </span>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Disponível
            </span>
          )}
        </div>

        {/* Instagram Post Link Badge */}
        <a
          href={vehicle.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver publicação oficial de ${vehicle.brand} ${vehicle.model} no Instagram da Dutra Automóveis`}
          className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-zinc-300 hover:text-white backdrop-blur-md border border-white/10 transition-colors"
          title="Ver no Instagram"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {/* Price Tag in Image Bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className="font-serif text-2xl font-bold text-white drop-shadow-md tracking-tight">
            {formatCurrencyBRL(vehicle.price)}
          </span>
          <span className="text-[11px] font-medium text-zinc-300 drop-shadow bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
            Aceita troca
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Brand & Model */}
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            {vehicle.brand}
          </span>
          <h3 className="font-serif text-lg font-bold text-white tracking-tight group-hover:text-zinc-200 transition-colors line-clamp-1">
            {vehicle.model}
          </h3>
          <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
            {vehicle.version}
          </p>

          {/* Unboxed Metadata Specs Line */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mt-3 pt-3 border-t border-white/5">
            <span className="flex items-center gap-1 text-zinc-300">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              {vehicle.year}
            </span>
            <span aria-hidden="true" className="text-zinc-700">
              ·
            </span>
            <span className="flex items-center gap-1 text-zinc-300">
              <Gauge className="w-3.5 h-3.5 text-zinc-500" />
              {formatKm(vehicle.mileage)}
            </span>
            <span aria-hidden="true" className="text-zinc-700">
              ·
            </span>
            <span className="flex items-center gap-1 text-zinc-300">
              <Fuel className="w-3.5 h-3.5 text-zinc-500" />
              {vehicle.fuel}
            </span>
          </div>

          {/* Quick highlight feature */}
          {vehicle.features.length > 0 && (
            <div className="mt-2.5 text-[11px] text-zinc-400 flex items-center gap-1.5 line-clamp-1">
              <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>{vehicle.features[0]}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => onOpenDetails(vehicle)}
            aria-label={`Ver fotos e informações de ${vehicle.brand} ${vehicle.model}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs font-semibold border border-white/10 hover:border-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver Detalhes</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar ${vehicle.brand} ${vehicle.model} no WhatsApp`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-semibold transition-all shadow-md shadow-emerald-950/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{isSold ? 'Consultar Similar' : 'WhatsApp'}</span>
          </a>
        </div>
      </div>
    </article>
  );
};
