#!/bin/bash
set -e

CONFIG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$CONFIG_DIR"

export DEBIAN_FRONTEND=noninteractive

apt-get update

apt-get install -y --no-install-recommends \
    live-build \
    debootstrap \
    grub-efi-amd64 \
    squashfs-tools \
    xorriso \
    syslinux-common \
    isolinux \
    dosfstools

lb config \
    --architectures amd64 \
    --bootloader grub-efi \
    --binary-filesystem ext4 \
    --distribution stable \
    --iso-volume "ClarkOS" \
    --apt-indices false \
    --zsync false \
    --quiet

cat > auto/bootstrap << 'BOOTSTRAP'
set -e
export DEBIAN_FRONTEND=noninteractive
lb bootstrap
BOOTSTRAP
chmod +x auto/bootstrap

cat > auto/config << 'CONFIG'
#!/bin/bash
set -e
lb config noauto \
    --architectures amd64 \
    --bootloader grub-efi \
    --binary-filesystem ext4 \
    --distribution stable \
    --iso-volume "ClarkOS" \
    --apt-indices false \
    --zsync false \
    --quiet
CONFIG
chmod +x auto/config

cat > auto/build << 'BUILD'
#!/bin/bash
set -e
lb build
BUILD
chmod +x auto/build

mkdir -p config/package-lists
cat > config/package-lists/clarkos.list.chroot << 'LIST'
# Core system
systemd
systemd-sysv
sudo
nano
curl
wget
network-manager
iw
wpasupplicant
alsa-utils
libgtk-3-0
xdg-utils
LIST

mkdir -p config/includes.chroot/etc/systemd/system
cat > config/includes.chroot/etc/systemd/system/clark-desktop.service << 'SERVICE'
[Unit]
Description=Clark Desktop
After=graphical.target
After=network.target

[Service]
Type=simple
User=clark
Group=clark
ExecStart=/usr/local/bin/clark-desktop
Restart=on-failure
RestartSec=5
TimeoutStartSec=10

[Install]
WantedBy=graphical.target
SERVICE

mkdir -p config/includes.chroot/etc/systemd/system/getty@tty1.service.d
cat > config/includes.chroot/etc/systemd/system/getty@tty1.service.d/override.conf << 'TTY'
[Service]
Type=simple
ExecStart=
ExecStart=-/sbin/agetty --autologin clark --noclear %I 38400 linux
TTY

mkdir -p config/includes.chroot/etc/sudoers.d
cat > config/includes.chroot/etc/sudoers.d/clark << 'SUDOERS'
clark ALL=(ALL) NOPASSWD: /usr/sbin/shutdown
clark ALL=(ALL) NOPASSWD: /usr/sbin/reboot
SUDOERS

mkdir -p config/includes.chroot/usr/local/bin
touch config/includes.chroot/usr/local/bin/.placeholder

echo "Live-build configuration initialized"