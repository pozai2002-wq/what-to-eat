import { API_BASE_URL, DEFAULT_MAX_RESULTS, DEFAULT_RADIUS } from '@/constants/config';

export interface Restaurant {
  id: string;
  name: string;
  rating?: number;
  userRatingCount?: number;
  priceLevel?: string;
  primaryType?: string;
  formattedAddress?: string;
  location: { latitude: number; longitude: number };
  regularOpeningHours?: {
    openNow?: boolean;
    weekdayDescriptions?: string[];
  };
  photos?: {
    name: string;
    widthPx: number;
    heightPx: number;
  }[];
  distanceMeters?: number;
}

export interface SearchParams {
  latitude: number;
  longitude: number;
  radius?: number;
  cuisineType?: string;
  priceLevels?: number[];
  maxResults?: number;
}

export interface SearchResponse {
  restaurants: Restaurant[];
  error?: string;
}

/**
 * Search for nearby restaurants via the API proxy
 */
export async function searchNearbyRestaurants(params: SearchParams): Promise<SearchResponse> {
  const {
    latitude,
    longitude,
    radius = DEFAULT_RADIUS,
    cuisineType = 'restaurant',
    priceLevels,
    maxResults = DEFAULT_MAX_RESULTS,
  } = params;

  try {
    const queryParams = new URLSearchParams({
      lat: latitude.toString(),
      lng: longitude.toString(),
      radius: radius.toString(),
      type: cuisineType,
      maxResults: maxResults.toString(),
    });

    if (priceLevels && priceLevels.length > 0) {
      queryParams.set('priceLevels', priceLevels.join(','));
    }

    const response = await fetch(`${API_BASE_URL}/api/restaurants?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 429) {
      return { restaurants: [], error: 'rate_limited' };
    }

    if (!response.ok) {
      return { restaurants: [], error: `api_error_${response.status}` };
    }

    const data = await response.json();
    return { restaurants: data.restaurants || [] };
  } catch (error) {
    console.error('searchNearbyRestaurants error:', error);
    return { restaurants: [], error: 'network_error' };
  }
}

/**
 * Get a photo URL for a Google Places photo reference
 */
export function getPhotoUrl(photoName: string, maxWidth: number = 400): string {
  return `${API_BASE_URL}/api/photo?name=${encodeURIComponent(photoName)}&maxWidth=${maxWidth}`;
}
