import test from 'node:test';
import assert from 'node:assert/strict';
import { filterAndSortVehicles, Vehicle } from './filterVehicles.js';

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    instagramUrl: 'https://instagram.com/p/test1',
    brand: 'Toyota',
    model: 'Corolla',
    version: 'XEi 2.0',
    year: '2023/2023',
    price: 135000,
    category: 'Sedan',
    status: 'Disponível',
    mileage: 28000,
    transmission: 'Automático',
    fuel: 'Flex',
    color: 'Prata',
    licensePlateEnd: '4',
    imageUrl: '',
    gallery: [],
    features: ['Ar digital', 'Bancos em couro'],
    description: 'Excelente estado',
  },
  {
    id: '2',
    instagramUrl: 'https://instagram.com/p/test2',
    brand: 'Yamaha',
    model: 'NMAX',
    version: '160 ABS',
    year: '2017',
    price: 12900,
    category: 'Moto',
    status: 'Vendido',
    mileage: 20000,
    transmission: 'CVT',
    fuel: 'Gasolina',
    color: 'Prata',
    licensePlateEnd: '8',
    imageUrl: '',
    gallery: [],
    features: ['Moto impecável', 'Freios ABS'],
    description: 'Impecável',
  },
  {
    id: '3',
    instagramUrl: 'https://instagram.com/p/test3',
    brand: 'Volkswagen',
    model: 'Polo',
    version: 'Highline 200 TSI',
    year: '2024/2024',
    price: 98000,
    category: 'Hatch',
    status: 'Disponível',
    mileage: 12000,
    transmission: 'Automático',
    fuel: 'Flex',
    color: 'Cinza',
    licensePlateEnd: '2',
    imageUrl: '',
    gallery: [],
    features: ['Painel digital', 'Chave presencial'],
    description: 'Garantia de fábrica',
  },
];

test('filters vehicles by category including Motos', () => {
  const motos = filterAndSortVehicles(mockVehicles, { category: 'Motos' });
  assert.equal(motos.length, 1);
  assert.equal(motos[0].model, 'NMAX');

  const all = filterAndSortVehicles(mockVehicles, { category: 'Todos' });
  assert.equal(all.length, 3);
});

test('filters vehicles by status', () => {
  const available = filterAndSortVehicles(mockVehicles, { statusFilter: 'available' });
  assert.equal(available.length, 2);

  const sold = filterAndSortVehicles(mockVehicles, { statusFilter: 'sold' });
  assert.equal(sold.length, 1);
  assert.equal(sold[0].model, 'NMAX');
});

test('filters vehicles by search term across brand and model', () => {
  const result = filterAndSortVehicles(mockVehicles, { searchTerm: 'yamaha' });
  assert.equal(result.length, 1);
  assert.equal(result[0].model, 'NMAX');
});

test('sorts vehicles by price ascending and descending', () => {
  const asc = filterAndSortVehicles(mockVehicles, { sortBy: 'price-asc' });
  assert.equal(asc[0].price, 12900);
  assert.equal(asc[2].price, 135000);

  const desc = filterAndSortVehicles(mockVehicles, { sortBy: 'price-desc' });
  assert.equal(desc[0].price, 135000);
  assert.equal(desc[2].price, 12900);
});

test('sorts vehicles by mileage ascending', () => {
  const kmAsc = filterAndSortVehicles(mockVehicles, { sortBy: 'km-asc' });
  assert.equal(kmAsc[0].mileage, 12000);
  assert.equal(kmAsc[2].mileage, 28000);
});
