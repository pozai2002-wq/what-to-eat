import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getColors, Spacing, Radius, FontSize } from '@/constants/theme';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function ErrorState({ message, onRetry, icon = 'alert-circle-outline' }: ErrorStateProps) {
  const scheme = useColorScheme() ?? 'dark';
  const colors = getColors(scheme);

  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={48} color={colors.textMuted} />
      <Text style={[styles.message, { color: colors.textSecondary }]}>
        {message}
      </Text>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          style={[styles.retryBtn, { borderColor: colors.border }]}
        >
          <Ionicons name="refresh" size={18} color={colors.accent} />
          <Text style={[styles.retryText, { color: colors.accent }]}>
            Try Again
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
    gap: Spacing.md,
  },
  message: {
    fontSize: FontSize.md,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    marginTop: Spacing.sm,
  },
  retryText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
});
