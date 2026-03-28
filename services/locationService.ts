import * as Location from 'expo-location';
import { Platform, Linking, Alert } from 'react-native';

export interface UserLocation {
  latitude: number;
  longitude: number;
}

/**
 * Request location permission and get current position
 */
export async function getCurrentLocation(): Promise<{
  location?: UserLocation;
  error?: 'permission_denied' | 'unavailable' | 'timeout' | 'unknown';
}> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return { error: 'permission_denied' };
    }

    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      location: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    };
  } catch (error: any) {
    console.error('getCurrentLocation error:', error);

    if (error?.code === 'E_LOCATION_SETTINGS_UNSATISFIED') {
      return { error: 'unavailable' };
    }

    return { error: 'unknown' };
  }
}

/**
 * Open device location settings
 */
export function openLocationSettings() {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings();
  }
}

/**
 * Show alert prompting user to enable location
 */
export function showLocationDeniedAlert() {
  Alert.alert(
    'Location Required',
    'We need your location to find restaurants near you. Please enable location access in Settings.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: openLocationSettings },
    ]
  );
}

/**
 * Get a reverse-geocoded area name from coordinates
 */
export async function getAreaName(latitude: number, longitude: number): Promise<string> {
  try {
    const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (address) {
      return address.city || address.district || address.subregion || 'your area';
    }
    return 'your area';
  } catch {
    return 'your area';
  }
}
