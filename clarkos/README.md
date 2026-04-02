# ClarkOS

A lightweight ChromeOS-like desktop operating system built with Tauri (Rust + React) and Debian live-build.

## Features

- **ChromeOS-like UI**: Bottom taskbar, app launcher grid, system tray
- **Lightweight**: Under 500MB RAM idle, boot under 10 seconds
- **Modern Desktop**: Draggable windows, minimize/maximize/close controls
- **Built-in Apps**: File Manager, Terminal, Web Browser, Settings

## Project Structure

```
ClarkOS/
├── .github/workflows/      # GitHub Actions CI/CD
├── live-build-config/      # Debian live-build configuration
│   ├── auto/              # Build scripts
│   └── config/            # Package lists, chroot configs
├── tauri-desktop/         # Tauri desktop application
│   ├── src/               # React frontend
│   │   ├── components/   # UI components
│   │   ├── stores/        # Zustand state management
│   │   └── styles/        # TailwindCSS styles
│   └── src-tauri/         # Rust backend
├── scripts/               # Build scripts
└── docs/                  # Documentation
```

## CI/CD Build

### GitHub Actions (Recommended)

The project includes a GitHub Actions workflow that builds the ISO automatically:

1. Push to `main` branch or create a tag (`v*`)
2. The workflow builds in a Debian container
3. ISO artifact is available for download

**Build Time:** ~20-30 minutes  
**ISO Size:** ~100-200MB (minimal)

### Manual Build

```bash
# Install dependencies
sudo apt-get install live-build debootstrap grub-efi-amd64-bin squashfs-tools xorriso

# Configure and build
cd live-build-config
sudo lb config
sudo lb bootstrap
sudo lb binary
sudo lb source

# Find your ISO
ls *.iso
```

## Development

### Prerequisites

- Debian-based Linux system
- Node.js 18+
- Rust 1.70+

### Setup

```bash
cd tauri-desktop
npm install
```

### Run Development Version

```bash
npm run tauri dev
```

### Build Tauri App

```bash
npm run tauri build
```

## System Requirements

- CPU: 64-bit x86 processor
- RAM: 4GB minimum, 8GB recommended
- Storage: 8GB minimum
- Boot: UEFI or BIOS

## Boot Process

1. Kernel loads → systemd starts
2. Auto-login to user `root`
3. X11/Wayland session starts
4. Clark Desktop launches in kiosk mode
5. Tauri app provides full desktop experience

## Security

- Minimal package set (no unnecessary services)
- App sandboxing via Tauri
- No open network ports by default
- Read-only ISO squashfs

## Performance

| Metric | Target |
|--------|--------|
| Boot time | < 10 seconds |
| RAM usage (idle) | < 500MB |
| Disk footprint | < 4GB |
| ISO size | ~150MB |
| CPU usage (idle) | < 5% |

## License

MIT
