#!/bin/bash

# Script to generate PNG favicon and icon files from SVG sources
# This ensures compatibility across all browsers and platforms

# Navigate to public directory
cd /Users/kam/Downloads/Digiwares/Projects/opos-voice/public

echo "🔨 Generating favicon and icon PNG files from SVG sources..."

# Generate favicon sizes from favicon.svg
echo "📱 Creating favicon PNG files..."
magick favicon.svg -resize 16x16 favicon-16x16.png
magick favicon.svg -resize 32x32 favicon-32x32.png
magick favicon.svg -background none -resize 32x32 favicon.ico

# Generate app icon sizes from icon.svg
echo "🍎 Creating Apple Touch Icon files..."
magick icon.svg -resize 180x180 apple-touch-icon.png
magick icon.svg -resize 180x180 apple-touch-icon-180x180.png

# Generate Android Chrome icons
echo "🤖 Creating Android Chrome icon files..."
magick icon.svg -resize 192x192 android-chrome-192x192.png
magick icon.svg -resize 512x512 android-chrome-512x512.png

# Generate various icon sizes for web app manifest
echo "🌐 Creating web app manifest icon files..."
magick icon.svg -resize 72x72 icon-72x72.png
magick icon.svg -resize 96x96 icon-96x96.png
magick icon.svg -resize 128x128 icon-128x128.png
magick icon.svg -resize 144x144 icon-144x144.png
magick icon.svg -resize 152x152 icon-152x152.png
magick icon.svg -resize 384x384 icon-384x384.png

# Generate Open Graph image PNG version (some platforms prefer PNG)
echo "📱 Creating Open Graph image PNG..."
magick og-image.svg -resize 1200x630 og-image.png
magick twitter-card.svg -resize 1200x600 twitter-card.png

echo "✅ All favicon and icon files generated successfully!"
echo ""
echo "Generated files:"
ls -la *.png *.ico | grep -E "(favicon|icon|og-image|twitter|apple|android)"

echo ""
echo "🚀 Your app is now ready with comprehensive favicon and social media assets!"
