export interface CuisineType {
  id: string;
  label: string;
  emoji: string;
  googleType: string;
}

export const CUISINES: CuisineType[] = [
  { id: 'all', label: 'All', emoji: '🍽️', googleType: 'restaurant' },
  { id: 'pizza', label: 'Pizza', emoji: '🍕', googleType: 'pizza_restaurant' },
  { id: 'chinese', label: 'Chinese', emoji: '🥡', googleType: 'chinese_restaurant' },
  { id: 'mexican', label: 'Mexican', emoji: '🌮', googleType: 'mexican_restaurant' },
  { id: 'japanese', label: 'Japanese', emoji: '🍣', googleType: 'japanese_restaurant' },
  { id: 'burger', label: 'Burgers', emoji: '🍔', googleType: 'hamburger_restaurant' },
  { id: 'indian', label: 'Indian', emoji: '🍛', googleType: 'indian_restaurant' },
  { id: 'thai', label: 'Thai', emoji: '🍜', googleType: 'thai_restaurant' },
  { id: 'italian', label: 'Italian', emoji: '🍝', googleType: 'italian_restaurant' },
  { id: 'cafe', label: 'Café', emoji: '☕', googleType: 'cafe' },
  { id: 'seafood', label: 'Seafood', emoji: '🦐', googleType: 'seafood_restaurant' },
  { id: 'korean', label: 'Korean', emoji: '🥘', googleType: 'korean_restaurant' },
  { id: 'bbq', label: 'BBQ', emoji: '🥩', googleType: 'barbecue_restaurant' },
  { id: 'salad', label: 'Healthy', emoji: '🥗', googleType: 'health_food_store' },
  { id: 'dessert', label: 'Dessert', emoji: '🍰', googleType: 'dessert_shop' },
];

export const PRICE_LEVELS = [
  { id: 1, label: '$', description: 'Inexpensive' },
  { id: 2, label: '$$', description: 'Moderate' },
  { id: 3, label: '$$$', description: 'Expensive' },
  { id: 4, label: '$$$$', description: 'Very Expensive' },
];

export const DISTANCE_OPTIONS = [
  { id: 800, label: '0.5 mi' },
  { id: 1600, label: '1 mi' },
  { id: 3200, label: '2 mi' },
  { id: 8000, label: '5 mi' },
  { id: 16000, label: '10 mi' },
];

export const GOOGLE_PRICE_MAP: Record<string, number> = {
  'PRICE_LEVEL_FREE': 0,
  'PRICE_LEVEL_INEXPENSIVE': 1,
  'PRICE_LEVEL_MODERATE': 2,
  'PRICE_LEVEL_EXPENSIVE': 3,
  'PRICE_LEVEL_VERY_EXPENSIVE': 4,
};
