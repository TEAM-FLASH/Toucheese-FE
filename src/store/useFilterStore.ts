import { create } from 'zustand';

interface FilterStore {
  minPrice: string;
  maxPrice: string;
  selectedServices: string[];
  setMinPrice: (price: string) => void;
  setMaxPrice: (price: string) => void;
  setSelectedServices: (services: string[]) => void;
  resetFilter: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  minPrice: '',
  maxPrice: '',
  selectedServices: [],
  setMinPrice: (price) => set({ minPrice: price }),
  setMaxPrice: (price) => set({ maxPrice: price }),
  setSelectedServices: (services) => set({ selectedServices: services }),
  resetFilter: () => set({ minPrice: '', maxPrice: '', selectedServices: [] }),
}));
