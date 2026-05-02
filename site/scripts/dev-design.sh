#!/bin/sh
set -e
cd "$(dirname "$0")/.."
PORT="${PORT:-3055}"
URL="http://localhost:${PORT}/poc/design"
NEXT_BIN="./node_modules/.bin/next"
if [ ! -x "$NEXT_BIN" ]; then
  echo "site/에서 npm install 후 다시 실행하세요."
  exit 1
fi

"$NEXT_BIN" dev --turbopack -p "$PORT" &
pid=$!

i=0
until curl -sf -o /dev/null "$URL"; do
  i=$((i + 1))
  if [ "$i" -gt 90 ]; then
    echo "timeout waiting for $URL"
    kill "$pid" 2>/dev/null || true
    exit 1
  fi
  sleep 0.4
done

if command -v open >/dev/null 2>&1; then
  open "$URL"
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$URL"
else
  echo "브라우저에서 열기: $URL"
fi

wait "$pid"
