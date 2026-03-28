import { useState, useCallback } from 'react';
import { searchNearbyRestaurants, type Restaurant, type SearchParams } from '@/services/placesApi';
import { weightedRandomPick } from '@/utils/random';
import { haversineDistance } from '@/utils/distance';
import { RADIUS_EXPANSION_FACTOR, MAX_RETRIES } from '@/constants/config';

interface UseRestaurantsReturn {
  currentPick: Restaurant | null;
  loading: boolean;
  error: string | null;
  allExhausted: boolean;
  spin: (params: SearchParams) => Promise<void>;
  spinAgain: () => void;
  reset: () => void;
}

export function useRestaurants(): UseRestaurantsReturn {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentPick, setCurrentPick] = useState<Restaurant | null>(null);
  const [shownIndices, setShownIndices] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastParams, setLastParams] = useState<SearchParams | null>(null);

  const pickRandom = useCallback(
    (list: Restaurant[], excluded: Set<number>) => {
      const result = weightedRandomPick(list, excluded);
      if (result) {
        // Calculate distance from user
        if (lastParams) {
          result.item.distanceMeters = haversineDistance(
            lastParams.latitude,
            lastParams.longitude,
            result.item.location.latitude,
            result.item.location.longitude
          );
        }
        setCurrentPick(result.item);
        setShownIndices((prev) => new Set([...prev, result.index]));
        return true;
      }
      return false;
    },
    [lastParams]
  );

  const spin = useCallback(
    async (params: SearchParams) => {
      setLoading(true);
      setError(null);
      setLastParams(params);

      let currentRadius = params.radius || 1600;
      let attempts = 0;

      while (attempts <= MAX_RETRIES) {
        const response = await searchNearbyRestaurants({
          ...params,
          radius: currentRadius,
        });

        if (response.error) {
          if (response.error === 'rate_limited') {
            setError('Whoa, slow down! Try again in a minute.');
          } else if (response.error === 'network_error') {
            setError('No connection. Check your internet and try again.');
          } else {
            setError('Something went wrong. Please try again.');
          }
          setLoading(false);
          return;
        }

        if (response.restaurants.length > 0) {
          // Calculate distances for all restaurants
          const withDistances = response.restaurants.map((r) => ({
            ...r,
            distanceMeters: haversineDistance(
              params.latitude,
              params.longitude,
              r.location.latitude,
              r.location.longitude
            ),
          }));

          setRestaurants(withDistances);
          const newShown = new Set<number>();
          const result = weightedRandomPick(withDistances, newShown);
          if (result) {
            setCurrentPick(result.item);
            newShown.add(result.index);
            setShownIndices(newShown);
          }
          setLoading(false);
          return;
        }

        // No results — expand radius and retry
        currentRadius *= RADIUS_EXPANSION_FACTOR;
        attempts++;
      }

      setError('No restaurants found nearby. Try a wider search area.');
      setLoading(false);
    },
    []
  );

  const spinAgain = useCallback(() => {
    if (restaurants.length === 0) return;
    const success = pickRandom(restaurants, shownIndices);
    if (!success) {
      // All exhausted — reset and pick again
      const newShown = new Set<number>();
      const result = weightedRandomPick(restaurants, newShown);
      if (result) {
        setCurrentPick(result.item);
        newShown.add(result.index);
        setShownIndices(newShown);
      }
    }
  }, [restaurants, shownIndices, pickRandom]);

  const reset = useCallback(() => {
    setRestaurants([]);
    setCurrentPick(null);
    setShownIndices(new Set());
    setError(null);
    setLastParams(null);
  }, []);

  const allExhausted = restaurants.length > 0 && shownIndices.size >= restaurants.length;

  return {
    currentPick,
    loading,
    error,
    allExhausted,
    spin,
    spinAgain,
    reset,
  };
}
