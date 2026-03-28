import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  useColorScheme,
  Linking,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { getColors, Spacing, Radius, FontSize, Shadows } from '@/constants/theme';
import { StarRating } from './StarRating';
import { formatPriceLevel, getOpenStatus } from '@/utils/format';
import { formatDistance } from '@/utils/distance';
import { getPhotoUrl } from '@/services/placesApi';
import { getDirectionsUrl } from '@/services/shareService';
import type { Restaurant } from '@/services/placesApi';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ResultCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onSpinAgain: () => void;
  onToggleFavorite: () => void;
  onShare: () => void;
}

export function ResultCard({
  restaurant,
  isFavorite,
  onSpinAgain,
  onToggleFavorite,
  onShare,
}: ResultCardProps) {
  const scheme = useColorScheme() ?? 'dark';
  const colors = getColors(scheme);
  const openStatus = getOpenStatus(restaurant.regularOpeningHours);
  const priceText = formatPriceLevel(restaurant.priceLevel);
  const distanceText = restaurant.distanceMeters
    ? formatDistance(restaurant.distanceMeters)
    : '';
  const cuisineText = restaurant.primaryType
    ? restaurant.primaryType.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : '';

  const photoUrl = restaurant.photos?.[0]
    ? getPhotoUrl(restaurant.photos[0].name, 600)
    : null;

  const handleDirections = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const url = getDirectionsUrl(restaurant);
    Linking.openURL(url);
  };

  const handleSpinAgain = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSpinAgain();
  };

  return (
    <Animated.View
      entering={FadeInDown.springify().damping(18).stiffness(120)}
      style={[styles.card, { backgroundColor: colors.card }, Shadows.card]}
    >
      {/* Photo */}
      {photoUrl ? (
        <Image
          source={{ uri: photoUrl }}
          style={styles.photo}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.photo, styles.photoPlaceholder, { backgroundColor: colors.bgSecondary }]}>
          <Text style={styles.photoPlaceholderEmoji}>🍽️</Text>
        </View>
      )}

      {/* Info */}
      <View style={styles.info}>
        <Animated.Text
          entering={FadeInUp.delay(100).springify()}
          style={[styles.name, { color: colors.text }]}
          numberOfLines={2}
        >
          {restaurant.name}
        </Animated.Text>

        {/* Rating row */}
        {restaurant.rating && (
          <Animated.View entering={FadeInUp.delay(150).springify()}>
            <StarRating
              rating={restaurant.rating}
              count={restaurant.userRatingCount}
            />
          </Animated.View>
        )}

        {/* Meta row */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.metaRow}>
          {priceText ? (
            <Text style={[styles.metaText, { color: colors.textSecondary }]}>
              {priceText}
            </Text>
          ) : null}
          {priceText && cuisineText ? (
            <Text style={[styles.metaDot, { color: colors.textMuted }]}> · </Text>
          ) : null}
          {cuisineText ? (
            <Text style={[styles.metaText, { color: colors.textSecondary }]} numberOfLines={1}>
              {cuisineText}
            </Text>
          ) : null}
          {distanceText ? (
            <>
              <Text style={[styles.metaDot, { color: colors.textMuted }]}> · </Text>
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                {distanceText}
              </Text>
            </>
          ) : null}
        </Animated.View>

        {/* Open status */}
        <Animated.View entering={FadeInUp.delay(250).springify()} style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: colors[openStatus.colorKey] },
            ]}
          />
          <Text style={[styles.statusText, { color: colors[openStatus.colorKey] }]}>
            {openStatus.text}
          </Text>
        </Animated.View>

        {/* Action buttons */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.actions}>
          <Pressable
            onPress={handleDirections}
            style={[styles.actionBtn, styles.primaryBtn, { backgroundColor: colors.accent }]}
          >
            <Ionicons name="navigate" size={20} color="#FFFFFF" />
            <Text style={styles.primaryBtnText}>Go Here</Text>
          </Pressable>

          <Pressable
            onPress={handleSpinAgain}
            style={[styles.actionBtn, styles.secondaryBtn, { borderColor: colors.border }]}
          >
            <Ionicons name="refresh" size={20} color={colors.accent} />
            <Text style={[styles.secondaryBtnText, { color: colors.accent }]}>
              Again
            </Text>
          </Pressable>
        </Animated.View>

        {/* Secondary actions */}
        <Animated.View entering={FadeInUp.delay(350).springify()} style={styles.secondaryActions}>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onToggleFavorite();
            }}
            style={styles.iconBtn}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? colors.error : colors.textMuted}
            />
            <Text style={[styles.iconBtnText, { color: colors.textMuted }]}>
              {isFavorite ? 'Saved' : 'Save'}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onShare();
            }}
            style={styles.iconBtn}
          >
            <Ionicons name="share-outline" size={24} color={colors.textMuted} />
            <Text style={[styles.iconBtnText, { color: colors.textMuted }]}>
              Share
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginHorizontal: Spacing.md,
  },
  photo: {
    width: '100%',
    height: 200,
  },
  photoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholderEmoji: {
    fontSize: 64,
  },
  info: {
    padding: Spacing.lg,
    gap: Spacing.sm + 2,
  },
  name: {
    fontSize: FontSize.xl,
    fontWeight: '800',
    lineHeight: 28,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
  metaDot: {
    fontSize: FontSize.sm,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs + 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
  },
  primaryBtn: {},
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  secondaryBtn: {
    borderWidth: 1.5,
  },
  secondaryBtnText: {
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xxl,
    marginTop: Spacing.xs,
  },
  iconBtn: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  iconBtnText: {
    fontSize: FontSize.xs,
    fontWeight: '500',
  },
});
