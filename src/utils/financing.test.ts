import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateMonthlyPayment, formatCurrencyBRL, formatKm } from './financing.js';

test('formatCurrencyBRL formats brazilian real correctly', () => {
  const formatted = formatCurrencyBRL(125000);
  assert.match(formatted, /125\.000/);
  assert.ok(formatted.includes('R$'));
});

test('formatKm formats mileage with km suffix', () => {
  assert.equal(formatKm(45200), '45.200 km');
  assert.equal(formatKm(0), '0 km');
});

test('calculateMonthlyPayment calculates valid installments with downpayment', () => {
  // Car price 100,000, 30,000 downpayment, 48 months
  const payment = calculateMonthlyPayment(100000, 30000, 48, 0.015);
  assert.ok(payment > 1800 && payment < 2400, `Payment was ${payment}`);
});

test('calculateMonthlyPayment returns 0 if downpayment covers the full price', () => {
  const payment = calculateMonthlyPayment(50000, 50000, 36);
  assert.equal(payment, 0);
});

test('calculateMonthlyPayment returns 0 for zero or negative terms', () => {
  const payment = calculateMonthlyPayment(50000, 10000, 0);
  assert.equal(payment, 0);
});
