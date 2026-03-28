import React from 'react';
import { View, Text, Pressable, StyleSheet, useColorScheme } from 'react-native';
import * as Haptics from 'expo-haptics';
import { PRICE_LEVELS } from '@/constants/cuisines';
import { getColors, Spacing, Radius, FontSize } from '@/constants/theme';

interface PriceFilterProps {
  selectedLevels: number[];
  onToggle: (level: number) => void;
}

export function PriceFilter({ selectedLevels, onToggle }: PriceFilterProps) {
  const scheme = useColorScheme() ?? 'dark';
  const colors = getColors(scheme);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textMuted }]}>Price</Text>
      <View style={styles.row}>
        {PRICE_LEVELS.map((pl) => {
          const selected = selectedLevels.includes(pl.id);
          return (
            <Pressable
              key={pl.id}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onToggle(pl.id);
              }}
              style={[
                styles.pill,
                {
                  backgroundColor: selected ? colors.accent : colors.card,
                  borderColor: selected ? colors.accent : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  { color: selected ? '#FFFFFF' : colors.textSecondary },
                ]}
              >
                {pl.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  pill: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  pillText: {
    fontSize: FontSize.md,
    fontWeight: '700',
  },
});
