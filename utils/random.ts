/**
 * Pick a random item from an array, optionally weighted by rating
 */
export function weightedRandomPick<T extends { rating?: number }>(
  items: T[],
  excludeIndices: Set<number> = new Set()
): { item: T; index: number } | null {
  const available = items
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => !excludeIndices.has(index));

  if (available.length === 0) return null;

  // Weight by rating: higher rating = slightly more likely
  const weights = available.map(({ item }) => {
    const rating = item.rating ?? 3.0;
    return Math.pow(rating, 1.5); // Gentle weighting curve
  });

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < available.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return available[i];
    }
  }

  // Fallback to last item
  return available[available.length - 1];
}

/**
 * Shuffle an array (Fisher-Yates)
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
