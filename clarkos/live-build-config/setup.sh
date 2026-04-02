#!/bin/bash
set -e

ISO_NAME="ClarkOS"
ISO_VERSION="1.0.0"
ISO_LABEL="ClarkOS"
ARCH="amd64"
ISO_PUBLISHER="ClarkOS Team"
ISO_DESCRIPTION="Lightweight ChromeOS-like OS"
LB_MODE="binary"
LB_BOOTSTRAP_INCLUDE="auto/config/bootstrap.include"

LB_BOOTSTRAP_INCLUDE_CONTENT='
set -e
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y --no-install-recommends \
    systemd \
    systemd-sysv \
    sudo \
    nano \
    vim-tiny \
    openssh-client \
    curl \
    wget \
    network-manager \
    iw \
    wpasupplicant \
    alsa-utils \
    pulseaudio \
    libgtk-3-0 \
    libwebkit2gtk-4.1-0 \
    libjavascriptcoregtk-4.1-0 \
    xdg-utils
'

cat > "$LB_BOOTSTRAP_INCLUDE" << 'LBEOF'
set -e
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y --no-install-recommends \
    systemd \
    systemd-sysv \
    sudo \
    nano \
    curl \
    wget \
    network-manager \
    iw \
    wpasupplicant \
    alsa-utils \
    libgtk-3-0 \
    xdg-utils
LBEOF

cat > auto/config << 'EOF'
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
EOF
chmod +x auto/config

cat > auto/build << 'EOF'
#!/bin/bash
set -e
lb build
EOF
chmod +x auto/build

mkdir -p config/package-lists
cat > config/package-lists/clarkos.list.chroot << 'EOF'
# Core system
systemd
systemd-sysv
sudo
nano
curl
wget
EOF

cat > config/archives/clarkos.pref << 'EOF'
Package: *
Pin: release a=stable
Pin-Priority: 900
EOF

mkdir -p config/includes.chroot/usr/local/bin
mkdir -p config/includes.chroot/etc/systemd/system

cat > config/includes.chroot/etc/systemd/system/clark-desktop.service << 'EOF'
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
EOF

cat > config/includes.chroot/etc/sudoers.d/clark << 'EOF'
clark ALL=(ALL) NOPASSWD: /usr/sbin/shutdown
clark ALL=(ALL) NOPASSWD: /usr/sbin/reboot
clark ALL=(ALL) NOPASSWD: /usr/bin/apt-get
EOF

cat > config/includes.chroot/etc/systemd/system/getty@tty1.service.d/override.conf << 'EOF'
[Service]
Type=simple
ExecStart=
ExecStart=-/sbin/agetty --autologin clark --noclear %I 38400 linux
EOF

mkdir -p config/includes.binary/usr/share/applications
cat > config/includes.binary/iso/autorun.cfg << 'EOF'
label clarkos
  menu label ^ClarkOS
  kernel /boot/vmlinuz
  append initrd=/boot/initrd.img boot=live quiet splash
EOF

echo "Live-build configuration created successfully"