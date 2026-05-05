#!/bin/sh
set -e
cd "$(dirname "$0")/.."
PORT="${PORT:-3060}"
FIGMA_SOCKET_PORT="${FIGMA_SOCKET_PORT:-3055}"
HOST="127.0.0.1"
URL="http://localhost:${PORT}/poc/design"
NEXT_BIN="./node_modules/.bin/next"

cleanup() {
  if [ -n "${pid:-}" ]; then
    kill "$pid" 2>/dev/null || true
    wait "$pid" 2>/dev/null || true
  fi
  if [ -n "${figma_socket_pid:-}" ]; then
    kill "$figma_socket_pid" 2>/dev/null || true
    wait "$figma_socket_pid" 2>/dev/null || true
  fi
}

is_port_listening() {
  if command -v lsof >/dev/null 2>&1; then
    lsof -nP -iTCP:"$1" -sTCP:LISTEN >/dev/null 2>&1
  elif command -v nc >/dev/null 2>&1; then
    nc -z "$HOST" "$1" >/dev/null 2>&1
  else
    return 1
  fi
}

trap 'cleanup; exit 130' INT
trap 'cleanup; exit 143' TERM
trap cleanup EXIT

if [ ! -x "$NEXT_BIN" ]; then
  echo "site/에서 npm install 후 다시 실행하세요."
  exit 1
fi

echo "K-Design 디자인 실행"
echo "- URL: $URL"
echo "- PORT: $PORT"
echo "- Figma WebSocket Port: $FIGMA_SOCKET_PORT"
echo ""
if is_port_listening "$FIGMA_SOCKET_PORT"; then
  echo "Figma WebSocket 서버가 이미 실행 중입니다."
elif command -v bunx >/dev/null 2>&1; then
  echo "Figma WebSocket 서버를 시작합니다..."
  PORT="$FIGMA_SOCKET_PORT" bunx cursor-talk-to-figma-socket &
  figma_socket_pid=$!
  sleep 2
  if is_port_listening "$FIGMA_SOCKET_PORT"; then
    echo "Figma WebSocket 서버 준비 완료."
  else
    echo "Figma WebSocket 서버 확인 대기 중입니다. Figma 플러그인에서 잠시 후 다시 연결해 보세요."
  fi
else
  echo "bunx를 찾지 못했습니다. Bun 설치 후 다시 실행하거나 Figma socket을 직접 시작해야 합니다."
fi

echo "Next 개발 서버를 시작합니다..."

# 127.0.0.1: 일부 샌드박스/CI에서 os.networkInterfaces() 실패를 피함
"$NEXT_BIN" dev --turbopack -p "$PORT" --hostname "$HOST" &
pid=$!

echo "디자인 페이지 준비 중: $URL"
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

echo "디자인 페이지를 엽니다: $URL"
if command -v open >/dev/null 2>&1; then
  open "$URL"
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$URL"
else
  echo "브라우저에서 열기: $URL"
fi

if command -v open >/dev/null 2>&1; then
  if open -Ra "Figma" >/dev/null 2>&1; then
    open -a "Figma" >/dev/null 2>&1 || true
    echo "Figma 앱을 열었습니다."
  else
    echo "Figma 앱을 자동으로 찾지 못했습니다. 필요하면 직접 열어 주세요."
  fi
else
  echo "Figma 앱은 수동으로 열어 주세요."
fi

echo ""
echo "Figma 준비:"
echo "1. Figma에서 작업 파일과 프레임을 엽니다."
echo "2. Figma 플러그인에서 WebSocket Server Port를 ${FIGMA_SOCKET_PORT}로 둡니다."
echo "3. Figma 플러그인/MCP 채널을 수동으로 연결합니다."
echo "4. Cursor에서 선택한 프레임 리뷰나 구현 요청을 이어서 진행합니다."
echo ""
echo "종료하려면 Ctrl+C를 누르세요."

set +e
wait "$pid"
status=$?
pid=""
cleanup
trap - INT TERM EXIT
exit "$status"
