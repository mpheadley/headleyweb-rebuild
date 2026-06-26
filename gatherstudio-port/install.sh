#!/usr/bin/env bash
#
# Gather Studio feature bundle — installer.
#
# Copies the bundle's src/ and content/ into a target Next.js repo, preserving
# paths (src/app/..., src/lib/..., content/blog/...). Reference files
# (globals.css, layout.tsx) are NOT copied — merge them by hand so you don't
# clobber Gather Studio's existing versions.
#
# Usage, from anywhere:
#   bash install.sh /path/to/gatherstudio-repo
# or, run from inside the GS repo root with the bundle alongside:
#   bash gatherstudio-port/install.sh .
#
set -euo pipefail

SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="${1:?Usage: bash install.sh /path/to/gatherstudio-repo}"

if [ ! -d "$DEST" ]; then
  echo "✗ Destination '$DEST' does not exist." >&2
  exit 1
fi

echo "→ Installing Gather Studio feature bundle"
echo "  from: $SRC_DIR"
echo "  into: $DEST"
echo

mkdir -p "$DEST/src" "$DEST/content"
cp -R "$SRC_DIR/src/."     "$DEST/src/"
cp -R "$SRC_DIR/content/." "$DEST/content/"

echo "✓ Copied src/ and content/"
echo
echo "NOT copied (merge by hand): $SRC_DIR/reference/{globals.css,layout.tsx}"
echo
echo "Next steps (see README.md):"
echo "  1. Install deps:"
echo "     npm i @supabase/supabase-js cheerio gray-matter jspdf lenis lucide-react \\"
echo "           marked next-mdx-remote reading-time remark-gfm resend"
echo "  2. Set env vars (PAGESPEED_API_KEY, ANTHROPIC_API_KEY, RESEND_API_KEY,"
echo "     HW_NEWSLETTER_AUDIENCE_ID, NEXT_PUBLIC_GA4_ID, NEXT_PUBLIC_INTERNAL_KEY)"
echo "  3. Finish manual steps: grep -rn 'REPLACE_ME\\|G-XXXXXXXXXX' src/"
echo "  4. Merge Sage & Stone tokens/classes from reference/globals.css"
echo "  5. npm run build"
