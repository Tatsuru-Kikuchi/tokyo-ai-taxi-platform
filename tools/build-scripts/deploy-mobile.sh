#!/bin/bash
echo "🚱 Deploying Tokyo AI Taxi Mobile App..."
cd apps/mobile
eas build --platform ios --profile production
echo "✅ Build submitted successfully!"
