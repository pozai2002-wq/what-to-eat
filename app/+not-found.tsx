import { Link, Stack } from 'expo-router';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { getColors, Spacing, FontSize } from '@/constants/theme';

export default function NotFoundScreen() {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <Text style={{ fontSize: 64 }}>🍽️</Text>
        <Text style={[styles.title, { color: colors.text }]}>
          Page not found
        </Text>
        <Link href="/" style={[styles.link, { color: colors.accent }]}>
          Go back home
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: '700',
  },
  link: {
    fontSize: FontSize.md,
    fontWeight: '600',
    marginTop: Spacing.sm,
  },
});
