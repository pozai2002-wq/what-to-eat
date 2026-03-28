export const Colors = {
  dark: {
    bg: '#13131A',
    bgSecondary: '#1A1A24',
    card: '#1E1E2A',
    cardHover: '#252536',
    accent: '#F06820',
    accentLight: '#FF8A4C',
    accentGlow: 'rgba(240, 104, 32, 0.3)',
    text: '#F2F2F5',
    textSecondary: '#9898A8',
    textMuted: '#6B6B80',
    success: '#4ADE80',
    warning: '#FBBF24',
    error: '#EF4444',
    border: '#2A2A3C',
    overlay: 'rgba(0, 0, 0, 0.6)',
    shimmer: '#2A2A3C',
  },
  light: {
    bg: '#FAFAFA',
    bgSecondary: '#F3F4F6',
    card: '#FFFFFF',
    cardHover: '#F5F5F5',
    accent: '#E85D10',
    accentLight: '#FF8A4C',
    accentGlow: 'rgba(232, 93, 16, 0.2)',
    text: '#1A1A2E',
    textSecondary: '#4B5563',
    textMuted: '#9CA3AF',
    success: '#16A34A',
    warning: '#F59E0B',
    error: '#DC2626',
    border: '#E5E7EB',
    overlay: 'rgba(0, 0, 0, 0.4)',
    shimmer: '#E5E7EB',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  hero: 34,
};

export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  button: {
    shadowColor: '#F06820',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
};

export type ColorScheme = 'dark' | 'light';

export function getColors(scheme: string | null | undefined) {
  return Colors[scheme === 'light' ? 'light' : 'dark'];
}
