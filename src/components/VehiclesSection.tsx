import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Car, X, ShieldAlert, Sparkles } from 'lucide-react';
import { VEHICLES_DATA } from '../data/vehiclesData.js';
import { Vehicle, SortOption, filterAndSortVehicles } from '../utils/filterVehicles.js';
import { VehicleCard } from './VehicleCard.js';
import { VehicleDetailModal } from './VehicleDetailModal.js';

export const VehiclesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'sold'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [activeModalVehicle, setActiveModalVehicle] = useState<Vehicle | null>(null);

  const categories = ['Todos', 'Motos', 'Pick-ups', 'SUVs', 'Sedans', 'Hatches'];

  const filteredVehicles = useMemo(() => {
    return filterAndSortVehicles(VEHICLES_DATA, {
      category: selectedCategory,
      statusFilter,
      searchTerm,
      sortBy,
    });
  }, [selectedCategory, statusFilter, searchTerm, sortBy]);

  const availableCount = VEHICLES_DATA.filter((v) => v.status === 'Disponível').length;
  const motosCount = VEHICLES_DATA.filter((v) => v.category === 'Moto').length;

  return (
    <section
      id="veiculos"
      aria-labelledby="veiculos-title"
      className="py-24 bg-black relative border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-400">
                Pátio & Estoque Oficial
              </span>
              <span aria-hidden="true" className="text-zinc-600">
                ·
              </span>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {availableCount} Disponíveis para Entrega Imediata
              </span>
            </div>
            <h2
              id="veiculos-title"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
            >
              Nosso Estoque de Veículos & Motos
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
              Confira os carros, camionetes e motocicletas com fotos reais tiradas
              na loja da Rua Serafim Valandro, 1820 e informações diretas das
              nossas publicações oficiais.
            </p>
          </div>

          <div className="text-xs text-zinc-400 self-start md:self-end">
            Exibindo <span className="font-semibold text-white">{filteredVehicles.length}</span> de{' '}
            <span className="font-semibold text-white">{VEHICLES_DATA.length}</span> ofertas
          </div>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="space-y-4 mb-10 p-4 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-sm">
          {/* Top row: Category filter tabs & Status filter tabs */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Segmented Control */}
            <div
              role="tablist"
              aria-label="Filtrar por categoria"
              className="flex items-center gap-1 p-1 bg-zinc-900/90 rounded-xl border border-white/5 overflow-x-auto"
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      isActive
                        ? 'bg-white text-black shadow-md'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cat} {cat === 'Motos' ? `(${motosCount})` : ''}
                  </button>
                );
              })}
            </div>

            {/* Status Segmented Control (Todos / Disponíveis / Vendidos) */}
            <div className="flex items-center gap-1 p-1 bg-zinc-900/90 rounded-xl border border-white/5 self-start lg:self-auto">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  statusFilter === 'all'
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('available')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  statusFilter === 'available'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Disponíveis
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('sold')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  statusFilter === 'sold'
                    ? 'bg-zinc-800 text-zinc-300 border border-white/10'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Vendidos
              </button>
            </div>
          </div>

          {/* Bottom row: Search input and sort selector */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/5">
            {/* Search Field */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar por Gol, NMAX, Bros, Amarok, Siena..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar veículos ou motos por nome ou marca"
                className="w-full pl-9 pr-8 py-2 text-xs bg-zinc-900 text-white placeholder-zinc-500 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  aria-label="Limpar busca"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="relative w-full sm:w-auto flex items-center gap-2">
              <label htmlFor="sort-vehicles" className="sr-only">
                Ordenar veículos por
              </label>
              <div className="relative w-full sm:w-52">
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="sort-vehicles"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  aria-label="Ordenar estoque de veículos"
                  className="w-full pl-8 pr-7 py-2 text-xs bg-zinc-900 text-zinc-200 border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-white/30 cursor-pointer"
                >
                  <option value="featured">Ordem do Instagram</option>
                  <option value="available-first">Disponíveis Primeiro</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="year-desc">Mais Novos (Ano)</option>
                  <option value="km-asc">Menor Quilometragem</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onOpenDetails={(v) => setActiveModalVehicle(v)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 rounded-2xl bg-zinc-950 border border-white/10 max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto text-zinc-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-white">
              Nenhuma oferta encontrada
            </h3>
            <p className="text-xs text-zinc-400">
              Não encontramos nenhum carro ou moto correspondente aos filtros atuais.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Todos');
                setStatusFilter('all');
                setSearchTerm('');
                setSortBy('featured');
              }}
              className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-zinc-800 text-white text-xs font-semibold hover:bg-zinc-700 transition-colors"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Limpar Filtros</span>
            </button>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-serif font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Quer comprar ou vender carro ou moto em Santa Maria?</span>
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400">
              Avaliamos seu veículo na hora ou encontramos a moto e o automóvel ideal sob encomenda com as melhores condições da região.
            </p>
          </div>
          <a
            href="https://wa.me/5555999714484?text=Ol%C3%A1%20Dutra%20Autom%C3%B3veis!%20Gostaria%20de%20consultar%20ve%C3%ADculos%20e%20motos%20dispon%C3%ADveis."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com consultor no WhatsApp"
            className="shrink-0 bg-white hover:bg-zinc-200 text-black font-semibold text-xs py-3 px-6 rounded-xl transition-colors shadow-lg"
          >
            Falar com Consultor
          </a>
        </div>
      </div>

      {/* Vehicle Details Modal */}
      <VehicleDetailModal
        vehicle={activeModalVehicle}
        onClose={() => setActiveModalVehicle(null)}
      />
    </section>
  );
};
