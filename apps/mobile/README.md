# 📱 Tokyo AI Taxi - Mobile App

React Native mobile application for the Tokyo AI Taxi Platform.

## Features

- **Driver Mode**: Dispatch system, demand prediction, revenue optimization
- **Customer Mode**: Instant booking, route search, trip history
- **GPS Tracking**: High-accuracy location (±1-3m)
- **LINE Integration**: Professional support (@dhai52765howdah)
- **Maps**: Google Maps integration with station markers

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
eas build --platform ios --profile production

# Submit to App Store
eas submit -p ios
```

## Configuration

- Update `app.json` for app settings
- Configure `eas.json` for build profiles
- Set environment variables in `.env`

## App Store

- **Bundle ID**: com.tatsuru-kikuchi.tokyo-taxi-ai
- **Version**: 3.0.0
- **Build**: Auto-incremented by EAS
