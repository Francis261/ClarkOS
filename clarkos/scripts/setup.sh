#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TAURI_DIR="$SCRIPT_DIR/../tauri-desktop"

echo "=== ClarkOS Development Setup ==="
echo ""

echo "[1/2] Installing Tauri dependencies..."
cd "$TAURI_DIR"
npm install

echo ""
echo "[2/2] Installing system dependencies for Tauri..."
if command -v apt-get &> /dev/null; then
    sudo apt-get install -y \
        libwebkit2gtk-4.1-dev \
        libgtk-3-dev \
        libayatana-appindicator3-dev \
        librsvg2-dev \
        patchelf
fi

echo ""
echo "=== Setup Complete ==="
echo ""
echo "To start development:"
echo "  cd $TAURI_DIR"
echo "  npm run tauri dev"
echo ""
echo "To build the application:"
echo "  npm run tauri build"