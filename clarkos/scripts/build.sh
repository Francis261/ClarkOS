#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TAURI_DIR="$SCRIPT_DIR/../tauri-desktop"
BUILD_DIR="$SCRIPT_DIR/../live-build-config"

echo "=== ClarkOS Build Script ==="
echo ""

echo "[1/3] Building Tauri application..."
cd "$TAURI_DIR"
npm install
npm run tauri build

echo ""
echo "[2/3] Copying Tauri app to live-build config..."
TAURI_BIN="$TAURI_DIR/src-tauri/target/release/clark-desktop"
if [ ! -f "$TAURI_BIN" ]; then
    echo "Error: Tauri binary not found at $TAURI_BIN"
    exit 1
fi

mkdir -p "$BUILD_DIR/config/includes.chroot/usr/local/bin"
cp "$TAURI_BIN" "$BUILD_DIR/config/includes.chroot/usr/local/bin/clark-desktop"
chmod +x "$BUILD_DIR/config/includes.chroot/usr/local/bin/clark-desktop"

echo ""
echo "[3/3] Building ISO with live-build..."
cd "$BUILD_DIR"

if [ ! -f "auto/config" ]; then
    echo "Initializing live-build config..."
    lb config
fi

echo "Starting live-build (this may take a while)..."
lb build

echo ""
echo "=== Build Complete ==="
ls -la *.iso 2>/dev/null || echo "ISO should be in the current directory"