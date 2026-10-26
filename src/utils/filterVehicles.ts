export type VehicleCategory =
  | 'Hatch'
  | 'Sedan'
  | 'SUV'
  | 'Pick-up'
  | 'Moto'
  | 'Utilitário';

export type VehicleStatus = 'Disponível' | 'Vendido';

export interface Vehicle {
  id: string;
  instagramUrl: string;
  brand: string;
  model: string;
  version: string;
  year: string;
  price: number;
  category: VehicleCategory;
  status: VehicleStatus;
  mileage: number;
  transmission: 'Automático' | 'Manual' | 'CVT';
  fuel: 'Flex' | 'Diesel' | 'Gasolina';
  color: string;
  licensePlateEnd: string;
  imageUrl: string;
  gallery: string[];
  features: string[];
  description: string;
  rawCaption?: string;
}

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'year-desc'
  | 'km-asc'
  | 'available-first';

export interface VehicleFilterParams {
  category?: string;
  statusFilter?: 'all' | 'available' | 'sold';
  searchTerm?: string;
  maxPrice?: number;
  sortBy?: SortOption;
}

export function filterAndSortVehicles(
  vehicles: Vehicle[],
  params: VehicleFilterParams
): Vehicle[] {
  let list = [...vehicles];

  // Category filter
  if (params.category && params.category !== 'Todos') {
    const cat = params.category.toLowerCase();
    if (cat === 'motos' || cat === 'moto') {
      list = list.filter((v) => v.category === 'Moto');
    } else if (cat === 'carros') {
      list = list.filter((v) => v.category !== 'Moto');
    } else if (cat === 'pick-ups' || cat === 'pick-up' || cat === 'camionetes') {
      list = list.filter((v) => v.category === 'Pick-up');
    } else {
      list = list.filter((v) => v.category.toLowerCase() === cat);
    }
  }

  // Status filter (all, available, sold)
  if (params.statusFilter === 'available') {
    list = list.filter((v) => v.status === 'Disponível');
  } else if (params.statusFilter === 'sold') {
    list = list.filter((v) => v.status === 'Vendido');
  }

  // Search filter (brand, model, version, year, caption)
  if (params.searchTerm && params.searchTerm.trim() !== '') {
    const q = params.searchTerm.toLowerCase().trim();
    list = list.filter(
      (v) =>
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.version.toLowerCase().includes(q) ||
        v.year.includes(q) ||
        v.category.toLowerCase().includes(q) ||
        (v.rawCaption && v.rawCaption.toLowerCase().includes(q))
    );
  }

  // Max price filter
  if (params.maxPrice && params.maxPrice > 0) {
    list = list.filter((v) => v.price <= params.maxPrice!);
  }

  // Sorting
  switch (params.sortBy) {
    case 'price-asc':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'year-desc':
      list.sort((a, b) => {
        const yearA = parseInt(a.year.split('/')[0]) || 0;
        const yearB = parseInt(b.year.split('/')[0]) || 0;
        return yearB - yearA;
      });
      break;
    case 'km-asc':
      list.sort((a, b) => a.mileage - b.mileage);
      break;
    case 'available-first':
      list.sort((a, b) => (a.status === 'Disponível' ? -1 : 1));
      break;
    case 'featured':
    default:
      // Keep curated order
      break;
  }

  return list;
}
