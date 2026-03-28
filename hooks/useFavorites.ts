import { useState, useEffect, useCallback } from 'react';
import { getFavorites, addFavorite, removeFavorite, isFavorite } from '@/services/favoritesService';
import type { Restaurant } from '@/services/placesApi';
import type { FavoriteRestaurant } from '@/services/favoritesService';

interface UseFavoritesReturn {
  favorites: FavoriteRestaurant[];
  isFav: boolean;
  toggleFavorite: (restaurant: Restaurant) => Promise<void>;
  checkFavorite: (id: string) => Promise<void>;
  refreshFavorites: () => Promise<void>;
}

export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<FavoriteRestaurant[]>([]);
  const [isFav, setIsFav] = useState(false);

  const refreshFavorites = useCallback(async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  }, []);

  const checkFavorite = useCallback(async (id: string) => {
    const result = await isFavorite(id);
    setIsFav(result);
  }, []);

  const toggleFavorite = useCallback(
    async (restaurant: Restaurant) => {
      if (isFav) {
        await removeFavorite(restaurant.id);
        setIsFav(false);
      } else {
        await addFavorite(restaurant);
        setIsFav(true);
      }
      await refreshFavorites();
    },
    [isFav, refreshFavorites]
  );

  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  return { favorites, isFav, toggleFavorite, checkFavorite, refreshFavorites };
}
