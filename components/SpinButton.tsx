import React from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { getColors, Spacing, Radius, FontSize, Shadows } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface SpinButtonProps {
  onPress: () => void;
  loading: boolean;
  disabled?: boolean;
}

export function SpinButton({ onPress, loading, disabled }: SpinButtonProps) {
  const scheme = useColorScheme() ?? 'dark';
  const colors = getColors(scheme);
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);
  const rotation = useSharedValue(0);

  // Pulsing glow animation
  React.useEffect(() => {
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  // Spinning icon when loading
  React.useEffect(() => {
    if (loading) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 800, easing: Easing.linear }),
        -1,
        false
      );
    } else {
      rotation.value = withTiming(0, { duration: 300 });
    }
  }, [loading]);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 300 });
  };

  const handlePress = () => {
    if (disabled || loading) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    scale.value = withSequence(
      withSpring(0.9, { damping: 15, stiffness: 400 }),
      withSpring(1.05, { damping: 8, stiffness: 200 }),
      withSpring(1, { damping: 10, stiffness: 300 })
    );
    onPress();
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[
        styles.button,
        { backgroundColor: colors.accent },
        Shadows.button,
        animatedButtonStyle,
      ]}
    >
      {/* Glow ring */}
      <Animated.View
        style={[
          styles.glowRing,
          { borderColor: colors.accent },
          animatedGlowStyle,
        ]}
      />

      <Animated.View style={animatedIconStyle}>
        <Ionicons
          name={loading ? 'refresh' : 'restaurant'}
          size={28}
          color="#FFFFFF"
        />
      </Animated.View>

      <Animated.Text style={styles.buttonText}>
        {loading ? 'Finding...' : 'SPIN TO EAT'}
      </Animated.Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    borderRadius: Radius.xl,
    width: '100%',
    position: 'relative',
    overflow: 'visible',
  },
  glowRing: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: Radius.xl + 4,
    borderWidth: 2,
  },
  buttonText: {
    fontSize: FontSize.lg,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
});
