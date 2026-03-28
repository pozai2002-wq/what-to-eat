import { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import { getCurrentLocation, getAreaName, showLocationDeniedAlert } from '@/services/locationService';
import type { UserLocation } from '@/services/locationService';

interface UseLocationReturn {
  location: UserLocation | null;
  areaName: string;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useLocation(): UseLocationReturn {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [areaName, setAreaName] = useState('your area');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Try native expo-location first
    const result = await getCurrentLocation();

    if (result.location) {
      setLocation(result.location);
      const name = await getAreaName(result.location.latitude, result.location.longitude);
      setAreaName(name);
      setLoading(false);
      return;
    }

    // On web, try browser Geolocation API as fallback
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.geolocation) {
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 8000,
            maximumAge: 300000,
          });
        });
        const webLocation = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        setLocation(webLocation);
        const name = await getAreaName(webLocation.latitude, webLocation.longitude);
        setAreaName(name);
        setLoading(false);
        return;
      } catch {
        // Browser geolocation also failed — fall through
      }
    }

    // All methods failed
    if (result.error === 'permission_denied') {
      setError('Location access denied');
      if (Platform.OS !== 'web') {
        showLocationDeniedAlert();
      }
    } else {
      setError('Could not get location');
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { location, areaName, loading, error, refresh };
}
