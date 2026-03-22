# Convergence — Feature Plan

Three features, in order. Finish and confirm each before starting the next.

---

## 1. Generative Audio (Web Audio API)

**Goal:** An ethereal ambient drone that breathes with the page and evolves as particles converge. No audio files — synthesized entirely in the browser.

**Architecture:**
- `AudioContext` created on first user interaction (scroll, click, or touch) to satisfy browser autoplay policy
- All nodes connected before audio starts — no dynamic patching mid-playback
- Master gain fades in over 3–4 seconds on init

**Sound layers:**
- **Drone root** — sine oscillator at 110 Hz (A2). The foundation.
- **Drone fifth** — sine oscillator at 165 Hz (E3), gain ~50% of root. Adds warmth and richness.
- **Shimmer** — sine oscillator at 880 Hz (A5), gain starts at 0, rises with `scrollProgress` to ~0.06. Represents convergence energy.
- **LFO** — very slow sine oscillator (~0.07 Hz) modulating master gain ±0.03. Creates the "breathing" feel.
- **Low-pass filter** — cuts harshness above ~700 Hz. All oscillators route through it before master gain.

**Scroll integration:**
- `updateAudio()` called each animation frame (same loop as Three.js)
- Shimmer gain: `scrollProgress * 0.06`
- Optional: drone root pitch drifts very slightly at convergence (`110 + scrollProgress * 2` Hz) — subtle, almost imperceptible

**UI:**
- Small mute toggle, fixed bottom-right of viewport
- Icon only (🔇/🔊 or a simple SVG dot), no label
- Appears after audio starts, not before (don't hint at audio before they've interacted)

**Mobile:** Web Audio API works on mobile. Touch already triggers `initAudio`.

---

## 2. Text From Distance — Middle Section Overlays

**Goal:** Replace flat opacity fades with a depth approach. Text starts small and far, approaches and becomes present, then recedes past the viewer. Like watching something drift through space toward you and past.

**Current:** Overlays controlled by `targetOpacity()` — simple opacity lerp at thresholds.

**New approach — three phases per overlay:**
1. **Approach** (entering): `scale(0.72)`, `blur(6px)`, `opacity: 0` → `scale(1)`, `blur(0)`, `opacity: 1`
2. **Presence** (visible): `scale(1)`, `blur(0)`, `opacity: 1` — holds steady
3. **Recession** (exiting): `scale(1)`, `blur(0)`, `opacity: 1` → `scale(1.18)`, `blur(5px)`, `opacity: 0`

**Implementation:**
- Replace `opacity` style updates with a `setOverlayTransform(el, progress, start, end)` function
- `progress` within the window drives both opacity and transform values
- Smooth lerp on current transform values (same 0.08 lerp as current opacity) prevents jitter

**Each overlay window** (start → end in scrollProgress):
- o1: 0.0 → 0.28
- o2: 0.38 → 0.65
- o3: 0.75 → 1.0

**CSS changes needed:**
- Add `will-change: transform, opacity, filter` to `.overlay`
- Remove any `transition` on `.overlay` — JS drives all changes

---

## 3. Multi-Layer Depth Tilt — Outro

**Goal:** Replace the current single `.outro-card` tilt with three stacked layers at different Z depths. Closer layers tilt more; farther layers tilt less. Viewer perceives real parallax depth.

**Current:** Single `.outro-card` div, one `rotateX/Y` on mousemove, MAX_TILT = 14°.

**New structure:**
```html
<div class="outro-card" id="outro-card">          <!-- perspective container -->
  <div class="outro-layer" data-depth="0.4">      <!-- far: h2 headline -->
    <h2>Ready to build something that moves?</h2>
  </div>
  <div class="outro-layer" data-depth="0.7">      <!-- mid: CTA -->
    <a href="..." id="outro-cta">Let's talk →</a>
  </div>
  <div class="outro-layer" data-depth="1.0">      <!-- near: brand -->
    <p class="outro-label">Headley Web & SEO</p>
  </div>
</div>
```

**Tilt logic:**
- `data-depth` is the tilt multiplier (0.4 = subtle, 1.0 = full tilt)
- On mousemove, compute `rotateX` and `rotateY` from cursor offset
- Apply each layer's transform: `rotateX(rx * depth)deg rotateY(ry * depth)deg translateZ(depth * 20px)`
- The `translateZ` is key — it physically separates the layers in 3D space so the parallax reads as actual depth

**CSS changes needed:**
- `.outro-card`: `transform-style: preserve-3d` (already set), `perspective: 900px` on parent (already set)
- `.outro-layer`: `transform-style: preserve-3d`, `display: flex`, centered
- Each layer positioned in the same space (not column stacked — overlapping in Z)

**Note:** Layers will visually overlap since they're in the same XY space. The headline, CTA, and brand name need vertical spacing built into each layer's padding/margin, not from the parent flexbox.

---

## Order and Dependencies

1. → **Audio** — isolated addition, no dependencies on anything else
2. → **Text from distance** — modifies the overlay system only
3. → **Multi-layer tilt** — modifies the outro DOM structure and JS

Each step is a discrete, self-contained change. Complete and confirm before moving to next.
