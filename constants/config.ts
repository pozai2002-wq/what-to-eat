// API proxy base URL — change this to your Vercel deployment URL
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://what-to-eat-api.vercel.app';

// Default search settings
export const DEFAULT_RADIUS = 1600; // meters (1 mile)
export const DEFAULT_MAX_RESULTS = 20;
export const MAX_RETRIES = 2;
export const RADIUS_EXPANSION_FACTOR = 2;

// Animation durations (ms)
export const SPIN_DURATION = 700;
export const CARD_REVEAL_DURATION = 500;
export const CHIP_BOUNCE_DURATION = 200;

// Cache settings
export const FAVORITES_KEY = '@what_to_eat_favorites';
export const FILTERS_KEY = '@what_to_eat_filters';
