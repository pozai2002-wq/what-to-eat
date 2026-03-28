import { useState, useEffect, useCallback } from 'react';
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

    const result = await getCurrentLocation();

    if (result.location) {
      setLocation(result.location);
      const name = await getAreaName(result.location.latitude, result.location.longitude);
      setAreaName(name);
    } else if (result.error === 'permission_denied') {
      setError('Location access denied');
      showLocationDeniedAlert();
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
