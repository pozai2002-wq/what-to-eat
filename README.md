# What to Eat 🍽️

> **One tap. One answer. Go eat.**

A native mobile app (iOS + Android + Web) that randomly picks a nearby restaurant — eliminating decision fatigue when you're hungry NOW.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (opens in Expo Go)
npx expo start

# Run on web
npx expo start --web
```

## Setup

### 1. Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project or select existing
3. Enable **Places API (New)**
4. Create an API key under Credentials
5. Copy `.env.example` to `.env` and add your key

### 2. API Proxy (Vercel)

The app uses a serverless proxy to hide the API key:

```bash
# Deploy the /api folder to Vercel
cd api
npx vercel
```

Then update `EXPO_PUBLIC_API_URL` in your `.env`.

### 3. Development

```bash
# iOS (requires Mac + Xcode)
npx expo start --ios

# Android (requires Android Studio)
npx expo start --android

# Web
npx expo start --web
```

## Tech Stack

- **Expo SDK 53** — React Native framework
- **TypeScript** — Type safety
- **Expo Router** — File-based navigation
- **react-native-reanimated** — 120fps native animations
- **expo-haptics** — Native haptic feedback
- **expo-location** — GPS + geocoding
- **Google Places API (New)** — Restaurant data (5K free/month)
- **Vercel Edge Functions** — API proxy

## Features

- 🎰 Spin-to-eat with haptic feedback
- 📍 GPS auto-location
- 🍕 Cuisine filter chips (15 categories)
- 💰 Price range filter ($-$$$$)
- 📏 Distance control (0.5-10 mi)
- 🔄 Spin again with exclusion
- 📍 One-tap directions
- ⭐ Save favorites (local)
- 📤 Native share
- 🌙 Dark/light mode (system)

## License

MIT
