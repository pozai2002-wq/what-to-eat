import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { getColors, FontSize, Spacing } from '@/constants/theme';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({ rating, count, size = 'md' }: StarRatingProps) {
  const scheme = useColorScheme() ?? 'dark';
  const colors = getColors(scheme);
  const starSize = size === 'sm' ? 12 : size === 'lg' ? 20 : 16;
  const textSize = size === 'sm' ? FontSize.xs : size === 'lg' ? FontSize.lg : FontSize.sm;

  const fullStars = Math.floor(rating);
  const partialFill = rating - fullStars;
  const emptyStars = 5 - fullStars - (partialFill > 0 ? 1 : 0);

  return (
    <View style={styles.container}>
      <Text style={[styles.rating, { fontSize: textSize, color: colors.text }]}>
        {rating.toFixed(1)}
      </Text>
      <View style={styles.stars}>
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Text key={`full-${i}`} style={{ fontSize: starSize, color: colors.warning }}>
            ★
          </Text>
        ))}
        {/* Partial star (simplified — show half if > 0.3) */}
        {partialFill > 0 && (
          <Text style={{ fontSize: starSize, color: partialFill > 0.3 ? colors.warning : colors.textMuted }}>
            ★
          </Text>
        )}
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Text key={`empty-${i}`} style={{ fontSize: starSize, color: colors.textMuted }}>
            ★
          </Text>
        ))}
      </View>
      {count !== undefined && (
        <Text style={[styles.count, { fontSize: textSize - 2, color: colors.textMuted }]}>
          ({count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count})
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  rating: {
    fontWeight: '700',
  },
  stars: {
    flexDirection: 'row',
    gap: 1,
  },
  count: {
    fontWeight: '500',
  },
});
