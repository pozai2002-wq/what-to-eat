import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme, ScrollView } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { CUISINES, type CuisineType } from '@/constants/cuisines';
import { getColors, Spacing, Radius, FontSize } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface FilterChipsProps {
  selectedCuisine: string;
  onSelect: (type: string) => void;
}

function Chip({ cuisine, selected, onPress }: { cuisine: CuisineType; selected: boolean; onPress: () => void }) {
  const scheme = useColorScheme() ?? 'dark';
  const colors = getColors(scheme);

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? colors.accent : colors.card,
          borderColor: selected ? colors.accent : colors.border,
        },
      ]}
    >
      <Text style={styles.chipEmoji}>{cuisine.emoji}</Text>
      <Text
        style={[
          styles.chipLabel,
          { color: selected ? '#FFFFFF' : colors.textSecondary },
        ]}
      >
        {cuisine.label}
      </Text>
    </Pressable>
  );
}

export function FilterChips({ selectedCuisine, onSelect }: FilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {CUISINES.map((cuisine) => (
        <Chip
          key={cuisine.id}
          cuisine={cuisine}
          selected={selectedCuisine === cuisine.googleType}
          onPress={() => onSelect(cuisine.googleType)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  chipEmoji: {
    fontSize: FontSize.md,
  },
  chipLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
});
