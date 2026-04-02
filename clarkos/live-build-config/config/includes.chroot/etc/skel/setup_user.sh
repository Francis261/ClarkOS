#!/bin/bash
set -e

useradd -m -s /bin/bash clark 2>/dev/null || true
echo "clark:clark" | chpasswd
mkdir -p /home/clark
