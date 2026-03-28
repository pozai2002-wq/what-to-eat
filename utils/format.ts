import { GOOGLE_PRICE_MAP } from '@/constants/cuisines';

/**
 * Format Google price level to $ symbols
 */
export function formatPriceLevel(priceLevel?: string): string {
  if (!priceLevel) return '';
  const level = GOOGLE_PRICE_MAP[priceLevel] ?? 0;
  if (level === 0) return 'Free';
  return '$'.repeat(level);
}

/**
 * Format rating to one decimal
 */
export function formatRating(rating?: number): string {
  if (!rating) return 'N/A';
  return rating.toFixed(1);
}

/**
 * Format review count
 */
export function formatReviewCount(count?: number): string {
  if (!count) return '';
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return `${count}`;
}

/**
 * Check if a place is currently open
 */
export function isOpenNow(openingHours?: { openNow?: boolean }): boolean | null {
  if (!openingHours || openingHours.openNow === undefined) return null;
  return openingHours.openNow;
}

/**
 * Get status text and color key
 */
export function getOpenStatus(openingHours?: { openNow?: boolean }): { text: string; colorKey: 'success' | 'error' | 'textMuted' } {
  const open = isOpenNow(openingHours);
  if (open === null) return { text: 'Hours unknown', colorKey: 'textMuted' };
  return open
    ? { text: 'Open Now', colorKey: 'success' }
    : { text: 'Closed', colorKey: 'error' };
}
