// Vercel Edge Function — Google Places Photo Proxy
// Proxies photo requests to keep the API key server-side

export const config = {
  runtime: 'edge',
};

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const photoName = url.searchParams.get('name');
  const maxWidth = url.searchParams.get('maxWidth') || '400';

  if (!photoName || !GOOGLE_API_KEY) {
    return new Response('Missing parameters', { status: 400 });
  }

  try {
    const photoUrl = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${maxWidth}&key=${GOOGLE_API_KEY}`;

    const response = await fetch(photoUrl, { redirect: 'follow' });

    if (!response.ok) {
      return new Response('Photo not found', { status: 404 });
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // Cache photos for 24h
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Photo proxy error:', error);
    return new Response('Internal error', { status: 500 });
  }
}
