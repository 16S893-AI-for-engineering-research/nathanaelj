#!/usr/bin/env bash
set -euo pipefail

# Wrapper: run the Python summarizer for clearer, aligned output.
# Path: .pi/skills/pi-sessions/scripts/summarize_pi_sessions.sh

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
PY_SUMMARY="$SCRIPT_DIR/summarize_pi_sessions.py"

if ! command -v python3 >/dev/null 2>&1; then
  echo "Error: python3 is required to run the Pi sessions summary." >&2
  exit 1
fi

exec python3 "$PY_SUMMARY"