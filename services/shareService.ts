import { Share, Platform } from 'react-native';
import type { Restaurant } from './placesApi';
import { formatPriceLevel } from '@/utils/format';

/**
 * Share a restaurant pick using native share sheet
 */
export async function shareRestaurant(restaurant: Restaurant): Promise<boolean> {
  const priceText = formatPriceLevel(restaurant.priceLevel);
  const ratingText = restaurant.rating ? `★ ${restaurant.rating.toFixed(1)}` : '';
  const typeText = restaurant.primaryType
    ? restaurant.primaryType.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : '';

  const parts = [ratingText, priceText, typeText].filter(Boolean).join(' · ');

  const message = `🍽️ What to Eat picked: ${restaurant.name}!\n${parts}\n📍 ${restaurant.formattedAddress || ''}`;

  // Google Maps directions link
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.location.latitude},${restaurant.location.longitude}&destination_place_id=${restaurant.id}`;

  try {
    const result = await Share.share(
      Platform.OS === 'ios'
        ? { message, url: mapsUrl }
        : { message: `${message}\n\n${mapsUrl}` }
    );

    return result.action === Share.sharedAction;
  } catch {
    return false;
  }
}

/**
 * Open directions to a restaurant in Google Maps or Apple Maps
 */
export function getDirectionsUrl(restaurant: Restaurant): string {
  const { latitude, longitude } = restaurant.location;

  if (Platform.OS === 'ios') {
    return `maps://app?daddr=${latitude},${longitude}`;
  }

  return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&destination_place_id=${restaurant.id}`;
}
