import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAVORITES_KEY } from '@/constants/config';
import type { Restaurant } from './placesApi';

export interface FavoriteRestaurant {
  id: string;
  name: string;
  rating?: number;
  priceLevel?: string;
  formattedAddress?: string;
  primaryType?: string;
  savedAt: number;
}

/**
 * Get all saved favorites
 */
export async function getFavorites(): Promise<FavoriteRestaurant[]> {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Add a restaurant to favorites
 */
export async function addFavorite(restaurant: Restaurant): Promise<void> {
  const favorites = await getFavorites();
  const exists = favorites.some((f) => f.id === restaurant.id);
  if (exists) return;

  const favorite: FavoriteRestaurant = {
    id: restaurant.id,
    name: restaurant.name,
    rating: restaurant.rating,
    priceLevel: restaurant.priceLevel,
    formattedAddress: restaurant.formattedAddress,
    primaryType: restaurant.primaryType,
    savedAt: Date.now(),
  };

  favorites.unshift(favorite);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

/**
 * Remove a restaurant from favorites
 */
export async function removeFavorite(restaurantId: string): Promise<void> {
  const favorites = await getFavorites();
  const filtered = favorites.filter((f) => f.id !== restaurantId);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
}

/**
 * Check if a restaurant is favorited
 */
export async function isFavorite(restaurantId: string): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.some((f) => f.id === restaurantId);
}
