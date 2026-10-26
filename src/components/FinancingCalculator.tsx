import React, { useState } from 'react';
import { Calculator, MessageCircle, ArrowRight } from 'lucide-react';
import { calculateMonthlyPayment, formatCurrencyBRL } from '../utils/financing.js';
import { COMPANY_DATA } from '../data/companyData.js';

export const FinancingCalculator: React.FC = () => {
  const [vehicleValue, setVehicleValue] = useState<number>(120000);
  const [downPayment, setDownPayment] = useState<number>(36000);
  const [termMonths, setTermMonths] = useState<number>(48);

  const financedAmount = Math.max(0, vehicleValue - downPayment);
  const monthlyPayment = calculateMonthlyPayment(
    vehicleValue,
    downPayment,
    termMonths,
    0.0149
  );

  const whatsappMessage = encodeURIComponent(
    `Olá Dutra Automóveis! Gostaria de simular um financiamento:\n` +
      `• Valor do Veículo: ${formatCurrencyBRL(vehicleValue)}\n` +
      `• Entrada prevista: ${formatCurrencyBRL(downPayment)}\n` +
      `• Prazo: ${termMonths} meses\n` +
      `• Parcela estimada no site: ${formatCurrencyBRL(monthlyPayment)}/mês\n` +
      `Poderiam verificar as melhores taxas dos bancos parceiros para o meu CPF?`
  );

  const handlePriceChange = (val: number) => {
    setVehicleValue(val);
    if (downPayment > val) {
      setDownPayment(Math.round(val * 0.3));
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Subtle top decoration */}
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
        <Calculator className="w-4 h-4 text-emerald-400" />
        <span>Simulador Online Santander, BV, Itaú & Bradesco</span>
      </div>

      <h3 className="font-serif text-2xl font-bold text-white mb-6">
        Simule as Parcelas do Seu Carro
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Controls */}
        <div className="space-y-5">
          {/* Vehicle Value */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label htmlFor="vehicle-val-slider" className="text-zinc-300 font-medium">
                Valor do Veículo
              </label>
              <span className="font-semibold text-white">
                {formatCurrencyBRL(vehicleValue)}
              </span>
            </div>
            <input
              id="vehicle-val-slider"
              type="range"
              min="40000"
              max="350000"
              step="5000"
              value={vehicleValue}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              aria-label="Selecionar valor estimado do carro para simulação"
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>

          {/* Down Payment */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label htmlFor="down-payment-slider" className="text-zinc-300 font-medium">
                Entrada (R$ ou seu usado)
              </label>
              <span className="font-semibold text-white">
                {formatCurrencyBRL(downPayment)} ({Math.round((downPayment / vehicleValue) * 100)}%)
              </span>
            </div>
            <input
              id="down-payment-slider"
              type="range"
              min="0"
              max={vehicleValue * 0.8}
              step="2000"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              aria-label="Selecionar valor de entrada para simulação"
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>

          {/* Term Months Selection */}
          <div className="space-y-2">
            <span className="text-xs text-zinc-300 font-medium block">
              Prazo de Financiamento
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[24, 36, 48, 60].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setTermMonths(term)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    termMonths === term
                      ? 'bg-white text-black border-white shadow-md'
                      : 'bg-zinc-900 text-zinc-300 border-white/10 hover:border-white/20'
                  }`}
                >
                  {term}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculated Output Box */}
        <div className="p-6 rounded-xl bg-zinc-900/90 border border-white/15 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs text-zinc-400 block mb-1">
                Estimativa da Parcela Mensal
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  {formatCurrencyBRL(monthlyPayment)}
                </span>
                <span className="text-xs text-zinc-400">/mês em {termMonths}x</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-zinc-400 pt-3 border-t border-white/10">
              <div className="flex justify-between">
                <span>Valor Financiado:</span>
                <span className="text-white font-medium">{formatCurrencyBRL(financedAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Entrada selecionada:</span>
                <span className="text-white font-medium">{formatCurrencyBRL(downPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de juros de referência:</span>
                <span className="text-emerald-400 font-medium">A partir de 1,49% a.m.</span>
              </div>
            </div>
          </div>

          <a
            href={`${COMPANY_DATA.whatsappUrl}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enviar simulação de financiamento para o WhatsApp da Dutra Automóveis"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-emerald-950/40"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enviar Simulação no WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
