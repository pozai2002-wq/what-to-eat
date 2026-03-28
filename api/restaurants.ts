// Vercel Edge Function — Google Places API Proxy
// Deploy this as a separate Vercel project or in the same mono-repo under /api

export const config = {
  runtime: 'edge',
};

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

const FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.rating',
  'places.userRatingCount',
  'places.priceLevel',
  'places.photos',
  'places.formattedAddress',
  'places.regularOpeningHours',
  'places.currentOpeningHours',
  'places.primaryType',
  'places.location',
].join(',');

export default async function handler(req: Request) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (!GOOGLE_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'API key not configured' }),
      { status: 500, headers }
    );
  }

  const url = new URL(req.url);
  const lat = url.searchParams.get('lat');
  const lng = url.searchParams.get('lng');
  const radius = url.searchParams.get('radius') || '1600';
  const type = url.searchParams.get('type') || 'restaurant';
  const maxResults = url.searchParams.get('maxResults') || '20';

  if (!lat || !lng) {
    return new Response(
      JSON.stringify({ error: 'lat and lng are required' }),
      { status: 400, headers }
    );
  }

  try {
    const body: any = {
      includedTypes: [type],
      maxResultCount: Math.min(parseInt(maxResults), 20),
      locationRestriction: {
        circle: {
          center: { latitude: parseFloat(lat), longitude: parseFloat(lng) },
          radius: parseFloat(radius),
        },
      },
    };

    const response = await fetch(
      'https://places.googleapis.com/v1/places:searchNearby',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_API_KEY,
          'X-Goog-FieldMask': FIELD_MASK,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Places error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'places_api_error', status: response.status }),
        { status: response.status, headers }
      );
    }

    const data = await response.json();

    // Transform response to our simplified format
    const restaurants = (data.places || []).map((place: any) => ({
      id: place.id,
      name: place.displayName?.text || 'Unknown',
      rating: place.rating,
      userRatingCount: place.userRatingCount,
      priceLevel: place.priceLevel,
      primaryType: place.primaryType,
      formattedAddress: place.formattedAddress,
      location: place.location,
      regularOpeningHours: place.currentOpeningHours || place.regularOpeningHours
        ? {
            openNow: (place.currentOpeningHours || place.regularOpeningHours)?.openNow,
            weekdayDescriptions: (place.regularOpeningHours)?.weekdayDescriptions,
          }
        : undefined,
      photos: place.photos?.slice(0, 3).map((p: any) => ({
        name: p.name,
        widthPx: p.widthPx,
        heightPx: p.heightPx,
      })),
    }));

    return new Response(
      JSON.stringify({ restaurants }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(
      JSON.stringify({ error: 'internal_error' }),
      { status: 500, headers }
    );
  }
}
