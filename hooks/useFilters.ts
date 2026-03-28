import { useState, useCallback } from 'react';
import { DEFAULT_RADIUS } from '@/constants/config';

export interface Filters {
  cuisineType: string;
  priceLevels: number[];
  radius: number;
}

const DEFAULT_FILTERS: Filters = {
  cuisineType: 'restaurant',
  priceLevels: [],
  radius: DEFAULT_RADIUS,
};

interface UseFiltersReturn {
  filters: Filters;
  setCuisine: (type: string) => void;
  togglePriceLevel: (level: number) => void;
  setRadius: (radius: number) => void;
  resetFilters: () => void;
}

export function useFilters(): UseFiltersReturn {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const setCuisine = useCallback((type: string) => {
    setFilters((prev) => ({ ...prev, cuisineType: type }));
  }, []);

  const togglePriceLevel = useCallback((level: number) => {
    setFilters((prev) => {
      const levels = prev.priceLevels.includes(level)
        ? prev.priceLevels.filter((l) => l !== level)
        : [...prev.priceLevels, level].sort();
      return { ...prev, priceLevels: levels };
    });
  }, []);

  const setRadius = useCallback((radius: number) => {
    setFilters((prev) => ({ ...prev, radius }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  return { filters, setCuisine, togglePriceLevel, setRadius, resetFilters };
}
