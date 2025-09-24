#!/bin/bash

# Script to clean up old icons and generate new green checkmark icons
echo "🧹 Cleaning Up Old Icons and Generating New Ones"
echo "================================================"
echo ""

# Create backup directory first
echo "📦 Creating backup of old icons..."
mkdir -p backup-old-icons

# List of old icon files to backup and remove
old_files=(
    "favicon.ico"
    "favicon-16x16.png"
    "favicon-32x32.png"
    "apple-touch-icon.png"
    "apple-touch-icon-180x180.png"
    "android-chrome-192x192.png"
    "android-chrome-512x512.png"
    "icon-72x72.png"
    "icon-96x96.png"
    "icon-128x128.png"
    "icon-144x144.png"
    "icon-152x152.png"
    "icon-384x384.png"
    "og-image.png"
    "twitter-card.png"
)

# Backup old files
echo "Moving old icons to backup folder..."
for file in "${old_files[@]}"; do
    if [ -f "public/$file" ]; then
        mv "public/$file" "backup-old-icons/"
        echo "  ✅ Backed up: $file"
    fi
done

echo ""
echo "🗑️  Old icons removed and backed up!"
echo ""

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null; then
    echo "❌ ImageMagick not found."
    echo ""
    echo "To install ImageMagick:"
    echo "  macOS: brew install imagemagick"
    echo "  Linux: sudo apt install imagemagick"
    echo ""
    echo "Or use online favicon generator:"
    echo "  1. Go to https://realfavicongenerator.net/"
    echo "  2. Upload public/icon.svg"
    echo "  3. Download and replace files in public/"
    echo ""
    exit 1
fi

echo "✅ ImageMagick found. Generating new green checkmark icons..."
echo ""

# Change to public directory for easier file handling
cd public

# Generate all required PNG sizes from the main icon.svg
echo "🔄 Generating favicon sizes..."
magick icon.svg -resize 16x16 favicon-16x16.png
magick icon.svg -resize 32x32 favicon-32x32.png

echo "🔄 Generating Apple touch icons..."
magick icon.svg -resize 180x180 apple-touch-icon.png
magick icon.svg -resize 180x180 apple-touch-icon-180x180.png

echo "🔄 Generating Android Chrome icons..."
magick icon.svg -resize 192x192 android-chrome-192x192.png
magick icon.svg -resize 512x512 android-chrome-512x512.png

echo "🔄 Generating PWA manifest icons..."
magick icon.svg -resize 72x72 icon-72x72.png
magick icon.svg -resize 96x96 icon-96x96.png
magick icon.svg -resize 128x128 icon-128x128.png
magick icon.svg -resize 144x144 icon-144x144.png
magick icon.svg -resize 152x152 icon-152x152.png
magick icon.svg -resize 384x384 icon-384x384.png

echo "🔄 Generating favicon.ico (multi-size)..."
magick favicon-16x16.png favicon-32x32.png favicon.ico

echo "🔄 Generating social media images..."
# Create a white background with the green checkmark centered
magick icon.svg -resize 600x600 -background white -gravity center -extent 1200x630 og-image.png
magick icon.svg -resize 400x400 -background white -gravity center -extent 800x418 twitter-card.png

# Return to root directory
cd ..

echo ""
echo "🎉 Icon generation complete!"
echo ""
echo "📁 New green checkmark files generated:"
echo "   ✅ favicon.ico"
echo "   ✅ favicon-16x16.png & favicon-32x32.png"
echo "   ✅ apple-touch-icon.png & apple-touch-icon-180x180.png"
echo "   ✅ android-chrome-192x192.png & android-chrome-512x512.png"
echo "   ✅ icon-72x72.png through icon-384x384.png"
echo "   ✅ og-image.png & twitter-card.png"
echo ""
echo "🗂️  Old icons safely backed up in: backup-old-icons/"
echo ""
echo "🚀 Ready to test and commit:"
echo "   npm run dev  # Test the new icons"
echo "   git add public/"
echo "   git commit -m 'feat: replace orange microphone with green checkmark icons'"
echo "   git push"
