import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getColors, Spacing, FontSize } from '@/constants/theme';

interface LocationBarProps {
  areaName: string;
  loading: boolean;
  radiusLabel: string;
}

export function LocationBar({ areaName, loading, radiusLabel }: LocationBarProps) {
  const scheme = useColorScheme() ?? 'dark';
  const colors = getColors(scheme);

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Ionicons
        name={loading ? 'locate-outline' : 'location'}
        size={18}
        color={colors.accent}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.label, { color: colors.textMuted }]}>Near</Text>
        <Text style={[styles.area, { color: colors.text }]} numberOfLines={1}>
          {loading ? 'Finding your location...' : areaName}
        </Text>
      </View>
      <View style={[styles.radiusBadge, { backgroundColor: colors.bgSecondary }]}>
        <Text style={[styles.radiusText, { color: colors.textSecondary }]}>
          {radiusLabel}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    borderRadius: 14,
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  area: {
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  radiusBadge: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs,
    borderRadius: 8,
  },
  radiusText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
});
