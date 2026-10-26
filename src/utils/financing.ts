/**
 * Financing calculator and currency formatting utilities
 */

export function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatKm(km: number): string {
  return new Intl.NumberFormat('pt-BR').format(km) + ' km';
}

/**
 * Calculates monthly installment using Price formula (amortization with interest)
 * @param price Total vehicle price in BRL
 * @param downPayment Down payment in BRL
 * @param months Number of months (e.g. 24, 36, 48, 60)
 * @param monthlyRate Monthly interest rate (default approx 1.49% per month ~ 19.5% p.a.)
 */
export function calculateMonthlyPayment(
  price: number,
  downPayment: number,
  months: number,
  monthlyRate: number = 0.0149
): number {
  const principal = Math.max(0, price - downPayment);
  if (principal <= 0 || months <= 0) return 0;
  if (monthlyRate <= 0) return principal / months;

  // Price amortization formula: P * (i * (1 + i)^n) / ((1 + i)^n - 1)
  const factor = Math.pow(1 + monthlyRate, months);
  const payment = (principal * (monthlyRate * factor)) / (factor - 1);
  return Math.round(payment);
}
