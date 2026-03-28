import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';

import { SpinButton } from '@/components/SpinButton';
import { FilterChips } from '@/components/FilterChips';
import { PriceFilter } from '@/components/PriceFilter';
import { DistanceSlider } from '@/components/DistanceSlider';
import { LocationBar } from '@/components/LocationBar';
import { ResultCard } from '@/components/ResultCard';
import { ErrorState } from '@/components/ErrorState';

import { useLocation } from '@/hooks/useLocation';
import { useRestaurants } from '@/hooks/useRestaurants';
import { useFilters } from '@/hooks/useFilters';
import { useFavorites } from '@/hooks/useFavorites';

import { shareRestaurant } from '@/services/shareService';
import { DISTANCE_OPTIONS } from '@/constants/cuisines';
import { getColors, Spacing, FontSize } from '@/constants/theme';

export default function HomeScreen() {
  const scheme = useColorScheme() ?? 'dark';
  const colors = getColors(scheme);
  const scrollRef = useRef<ScrollView>(null);

  // Hooks
  const { location, areaName, loading: locationLoading, refresh: refreshLocation } = useLocation();
  const { currentPick, loading: spinning, error, allExhausted, spin, spinAgain, reset } = useRestaurants();
  const { filters, setCuisine, togglePriceLevel, setRadius } = useFilters();
  const { isFav, toggleFavorite, checkFavorite } = useFavorites();

  // Check favorite status when pick changes
  useEffect(() => {
    if (currentPick) {
      checkFavorite(currentPick.id);
    }
  }, [currentPick, checkFavorite]);

  // Get current distance label
  const radiusLabel = DISTANCE_OPTIONS.find((d) => d.id === filters.radius)?.label || '1 mi';

  // Handle spin
  const handleSpin = useCallback(async () => {
    if (!location) {
      refreshLocation();
      return;
    }

    await spin({
      latitude: location.latitude,
      longitude: location.longitude,
      radius: filters.radius,
      cuisineType: filters.cuisineType,
      priceLevels: filters.priceLevels.length > 0 ? filters.priceLevels : undefined,
    });

    // Scroll to result after spin
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 400);
  }, [location, filters, spin, refreshLocation]);

  // Handle spin again
  const handleSpinAgain = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    spinAgain();
  }, [spinAgain]);

  // Handle share
  const handleShare = useCallback(async () => {
    if (currentPick) {
      await shareRestaurant(currentPick);
    }
  }, [currentPick]);

  // Handle favorite toggle
  const handleToggleFavorite = useCallback(async () => {
    if (currentPick) {
      await toggleFavorite(currentPick);
    }
  }, [currentPick, toggleFavorite]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <Animated.View entering={FadeIn.delay(100)} style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            What to Eat?
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Can't decide? Let us pick for you.
          </Text>
        </Animated.View>

        {/* Location bar */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <LocationBar
            areaName={areaName}
            loading={locationLoading}
            radiusLabel={radiusLabel}
          />
        </Animated.View>

        {/* Cuisine filters */}
        <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
            CUISINE
          </Text>
          <FilterChips
            selectedCuisine={filters.cuisineType}
            onSelect={setCuisine}
          />
        </Animated.View>

        {/* Price + Distance */}
        <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.filtersRow}>
          <PriceFilter
            selectedLevels={filters.priceLevels}
            onToggle={togglePriceLevel}
          />
          <DistanceSlider
            selectedRadius={filters.radius}
            onSelect={setRadius}
          />
        </Animated.View>

        {/* Spin Button */}
        <Animated.View entering={FadeInDown.delay(500).springify()} style={styles.spinSection}>
          <SpinButton
            onPress={handleSpin}
            loading={spinning}
            disabled={locationLoading}
          />
        </Animated.View>

        {/* Error state */}
        {error && (
          <ErrorState
            message={error}
            onRetry={handleSpin}
            icon={error.includes('connection') ? 'cloud-offline-outline' : 'alert-circle-outline'}
          />
        )}

        {/* Result */}
        {currentPick && !spinning && !error && (
          <View style={styles.resultSection}>
            {allExhausted && (
              <Text style={[styles.exhaustedText, { color: colors.warning }]}>
                🔄 You've seen all results — looping back!
              </Text>
            )}
            <ResultCard
              restaurant={currentPick}
              isFavorite={isFav}
              onSpinAgain={handleSpinAgain}
              onToggleFavorite={handleToggleFavorite}
              onShare={handleShare}
            />
          </View>
        )}

        {/* Bottom spacer */}
        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingTop: Spacing.lg,
    gap: Spacing.lg,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.xs,
  },
  title: {
    fontSize: FontSize.hero,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSize.md,
    fontWeight: '500',
  },
  section: {
    gap: Spacing.sm,
  },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: Spacing.md,
  },
  filtersRow: {
    gap: Spacing.lg,
  },
  spinSection: {
    paddingHorizontal: Spacing.lg,
  },
  resultSection: {
    gap: Spacing.sm,
  },
  exhaustedText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
});
