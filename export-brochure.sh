#!/bin/bash
# Export brochure panels as 300 DPI PNGs using Chrome headless
# Output: outside.png and inside.png in headleyweb-rebuild/

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
FILE="file:///Users/matthewheadley1/Developer/webdev/headleyweb-rebuild/brochure-trifold-traditional-print.html"
OUT="/Users/matthewheadley1/Developer/webdev/headleyweb-rebuild"

# 11.25in × 8.75in at 300 DPI = 3375 × 2625 px
# window-size drives the viewport; device-scale-factor 3.125 = 300/96 DPI
W=1080   # 11.25in × 96px
H=840    # 8.75in × 96px
SCALE=3.125

echo "Exporting outside panel..."
"$CHROME" \
  --headless=new \
  --disable-gpu \
  --window-size=${W},${H} \
  --force-device-scale-factor=${SCALE} \
  --screenshot="${OUT}/brochure-outside.png" \
  --hide-scrollbars \
  "${FILE}#outside"

echo "Exporting inside panel..."
"$CHROME" \
  --headless=new \
  --disable-gpu \
  --window-size=${W},${H} \
  --force-device-scale-factor=${SCALE} \
  --screenshot="${OUT}/brochure-inside.png" \
  --hide-scrollbars \
  "${FILE}#inside"

echo "Done. Files saved to:"
echo "  $OUT/brochure-outside.png"
echo "  $OUT/brochure-inside.png"
