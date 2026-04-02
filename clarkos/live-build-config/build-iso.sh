#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$SCRIPT_DIR"

echo "=== ClarkOS ISO Build Script ==="
echo "This script must be run as root (sudo)"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Error: This script must be run as root"
    echo "Please run: sudo bash $0"
    exit 1
fi

cd "$CONFIG_DIR"

echo "[1/4] Cleaning previous build..."
lb clean --all 2>/dev/null || true

echo "[2/4] Configuring live-build..."
lb config

echo "[3/4] Bootstrapping Debian base..."
lb bootstrap

echo "[4/4] Building ISO (this may take 30+ minutes)..."
lb build

echo ""
echo "=== Build Complete ==="
ls -lh *.iso 2>/dev/null && echo "ISO file ready!"