/*
  Between Worlds — GSAP + Three.js Combined

  Architecture:
  - GSAP handles hero entrance and pins the Three.js section (300vh of scroll)
  - scrollProgress (0→1) is written by GSAP's onUpdate each scroll frame
  - Three.js reads scrollProgress every animation frame to drive the scene
  - Particles start scattered (ambient drift + cursor repulsion)
  - As scrollProgress grows, particles gather toward origin → constellation dissolves → orb

  Bridge: `scrollProgress` is a module-level variable. GSAP writes it; Three.js reads it.
  No events needed — shared state in the same module scope.
*/

import * as THREE from "three";
import { EffectComposer }  from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass }      from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";


// ── 0. SHARED STATE (GSAP writes, Three.js reads) ─────────────────────────────

let scrollProgress = 0;
let autoRotateY    = 0;
let clickTime      = -999; // far past — no wave on load

// Sphere-surface cursor color — pre-allocated, updated each frame
const _sphereRay    = new THREE.Raycaster();
const _sphereNDC    = new THREE.Vector2();
const _sphereHit    = new THREE.Vector3();
const _hitSphereGeo = new THREE.Sphere(new THREE.Vector3(), 16);
const cursorSphereDir = new THREE.Vector3(0, 1, 0);


// ── 1. GSAP — hero entrance + pin ─────────────────────────────────────────────

gsap.registerPlugin(ScrollTrigger);

// Hero entrance — text emerges from deep space (scale + blur → full size + sharp)
gsap.set(".eyebrow",     { scale: 0.82, filter: "blur(8px)"  });
gsap.set(".hero h1",     { scale: 0.75, filter: "blur(14px)" });
gsap.set(".scroll-hint", { scale: 0.88, filter: "blur(5px)"  });

gsap.timeline({ defaults: { ease: "power2.out" } })
  .to(".eyebrow",    { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8 })
  .to(".hero h1",    { opacity: 1, scale: 1, filter: "blur(0px)", duration: 4.0 }, "+=0.1")
  // Button enters during h1's long fade, finishes ~1s before h1 ends
  .to("#mute-btn",   { opacity: 1, duration: 0.9 }, "-=2.0")
  // Scroll hint enters right after button is done
  .to(".scroll-hint", {
    opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2,
    onStart: () => {
      gsap.to(".scroll-hint", {
        y: -8, duration: 1.6, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.3,
      });
    },
  }, "-=1.1");

// Hero title drifts up as you scroll away from it
gsap.to(".hero h1", {
  y: "-18vh", ease: "none",
  scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
});

// Outro fade-in — explicit fromTo so GSAP owns both start and end values
gsap.fromTo(".outro",
  { opacity: 0, y: 28 },
  { opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
    scrollTrigger: { trigger: ".outro", start: "top 75%", once: true } }
);

// Stabilize scroll on iOS Safari — prevents browser chrome from fighting the pin
ScrollTrigger.normalizeScroll(true);

// Pin the Three.js section — 300vh of scroll = scrollProgress goes 0→1
ScrollTrigger.create({
  trigger: ".threejs-section",
  start:   "top top",
  end:     "+=1200vh",
  pin:     true,
  scrub:   0.3,
  // Clamp so sphere fully converges at 75% of the scroll,
  // leaving the last ~300vh to appreciate the complete orb before outro appears
  onUpdate: (self) => { scrollProgress = Math.min(1, self.progress / 0.75); },
});


// ── 2. SCENE SETUP ────────────────────────────────────────────────────────────

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 80;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x08080f, 1);
const canvasContainer = document.getElementById("canvas-container");
canvasContainer.appendChild(renderer.domElement);

// "touch it" cue — fades in when sphere is complete
const clickCue = document.getElementById("click-cue");

function updateClickCue() {
  if (!clickCue) return;
  clickCue.style.opacity = scrollProgress >= 0.9 ? "1" : "0";
}

// Ripple click — only fires when sphere is formed
const raycaster  = new THREE.Raycaster();
const clickNDC   = new THREE.Vector2();
const rippleSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 16);
let   rippleOrigin = new THREE.Vector3(0, 1, 0); // normalized direction in group-local space

canvasContainer.addEventListener("click", (e) => {
  const rect = canvasContainer.getBoundingClientRect();
  clickNDC.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
  clickNDC.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;

  raycaster.setFromCamera(clickNDC, camera);
  const hit = new THREE.Vector3();
  if (raycaster.ray.intersectSphere(rippleSphere, hit)) {
    // Sphere stage — ripple from the exact point clicked on the surface
    group.worldToLocal(hit);
    rippleOrigin.copy(hit).normalize();
  } else {
    // Stardust stage — ripple from the cursor direction projected into the field
    rippleOrigin.set(clickNDC.x, clickNDC.y, 0).normalize();
  }

  clickTime = clock.getElapsedTime();
  playRippleSound();
});

// Pointer cursor — always clickable
function updateCanvasCursor() {
  canvasContainer.style.cursor = "pointer";
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});


// ── 3. PARTICLES ──────────────────────────────────────────────────────────────

const PARTICLE_COUNT = 1800;
const FIELD_SIZE     = 160;

// Three position buffers:
//   originalPositions — fixed spawn coords, never changes
//   basePositions     — drifts via sine; the lerp rest target
//   positions         — live positions rendered each frame
const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
const basePositions     = new Float32Array(PARTICLE_COUNT * 3);
const positions         = new Float32Array(PARTICLE_COUNT * 3);
const colors            = new Float32Array(PARTICLE_COUNT * 3);

const BASE_COLOR   = new THREE.Color(0xc8a96e); // warm gold
const NEAR_COLOR   = new THREE.Color(0xffffff); // pure white (cursor glow)
const GATHER_COLOR = new THREE.Color(0x90b8ff); // cool blue-white (convergence)
const COLOR_RADIUS = 30;

for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
  const x = (Math.random() - 0.5) * FIELD_SIZE;
  const y = (Math.random() - 0.5) * FIELD_SIZE;
  const z = (Math.random() - 0.5) * FIELD_SIZE; // isotropic — equal depth so poles fill evenly

  originalPositions[i]     = basePositions[i]     = positions[i]     = x;
  originalPositions[i + 1] = basePositions[i + 1] = positions[i + 1] = y;
  originalPositions[i + 2] = basePositions[i + 2] = positions[i + 2] = z;

  colors[i] = BASE_COLOR.r; colors[i + 1] = BASE_COLOR.g; colors[i + 2] = BASE_COLOR.b;
}

// 3D repulsion path: converge to origin, repulsion acts in all 3 axes

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
geometry.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  vertexColors:    true,
  size:            0.65,
  sizeAttenuation: true,
  transparent:     true,
  opacity:         0.9,
});

const particles = new THREE.Points(geometry, material);


// ── 4. CONSTELLATION LINES ────────────────────────────────────────────────────

/*
  Precomputed at startup using originalPositions — O(n²) but fast at n=1800.
  As particles gather toward origin the lines compress and dissolve into the core,
  which is the right visual: constellation → orb of light.
*/
const CONNECTION_DIST = 14;
const MAX_CONNECTIONS = 3000;
const pairs           = [];

for (let i = 0; i < PARTICLE_COUNT && pairs.length / 2 < MAX_CONNECTIONS; i++) {
  for (let j = i + 1; j < PARTICLE_COUNT && pairs.length / 2 < MAX_CONNECTIONS; j++) {
    const dx = originalPositions[i * 3]     - originalPositions[j * 3];
    const dy = originalPositions[i * 3 + 1] - originalPositions[j * 3 + 1];
    const dz = originalPositions[i * 3 + 2] - originalPositions[j * 3 + 2];
    if (dx * dx + dy * dy + dz * dz < CONNECTION_DIST * CONNECTION_DIST) {
      pairs.push(i, j);
    }
  }
}

const linePositions = new Float32Array((pairs.length / 2) * 6);
const lineGeo       = new THREE.BufferGeometry();
lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

const lineMat = new THREE.LineBasicMaterial({
  color:       0xc8a96e,
  transparent: true,
  opacity:     0.13,
});

const lineSegments = new THREE.LineSegments(lineGeo, lineMat);

// Group so particles + lines rotate together
const group = new THREE.Group();
group.add(particles);
group.add(lineSegments);
scene.add(group);


// ── 5. MOUSE / TOUCH ──────────────────────────────────────────────────────────

const mouse     = new THREE.Vector2(0, 0);
const mouseLag  = new THREE.Vector2(0, 0);
let mouseActive = false;

function setMouseFromEvent(clientX, clientY) {
  mouse.x =  (clientX / window.innerWidth)  * 2 - 1;
  mouse.y = -(clientY / window.innerHeight) * 2 + 1;
  mouseActive = true;
}

window.addEventListener("mousemove", (e) => setMouseFromEvent(e.clientX, e.clientY));

window.addEventListener("touchmove", (e) => {
  setMouseFromEvent(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: true });

window.addEventListener("touchstart", (e) => {
  mouseActive = true;
  setMouseFromEvent(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: true });


// ── 6. BLOOM ──────────────────────────────────────────────────────────────────

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.2,  // strength
  0.5,  // radius
  0.08  // threshold
));


// ── 7. TEXT OVERLAYS ──────────────────────────────────────────────────────────

/*
  Each overlay has a scroll progress window (start → end).
  Opacity smoothly lerps toward the computed target each frame.
  FADE_WIDTH controls how quickly they fade in/out at the edges.
*/
const FADE_WIDTH = 0.07;

// Swap scroll cue text for touch devices
const scrollCue = document.getElementById("scroll-cue");
if (scrollCue && window.matchMedia("(pointer: coarse)").matches) {
  scrollCue.textContent = "Scroll slowly — let it breathe";
}

const overlays = [
  { el: document.getElementById("o1"), start: 0.0,  end: 0.28, xMult: 18, yMult: 8  },
  { el: document.getElementById("o2"), start: 0.38, end: 0.65, xMult: 30, yMult: 12 },
  { el: document.getElementById("o3"), start: 0.75, end: 1.0,  xMult: 12, yMult: 5  },
];
if (scrollCue) overlays.push({ el: scrollCue, start: 0.02, end: 0.95, xMult: 8, yMult: 0 });

const currentOpacities = overlays.map(() => 0);

function targetOpacity(progress, start, end) {
  if (progress < start - FADE_WIDTH || progress > end + FADE_WIDTH) return 0;
  if (progress < start) return (progress - (start - FADE_WIDTH)) / FADE_WIDTH;
  if (progress > end)   return 1 - (progress - end) / FADE_WIDTH;
  return 1;
}

function updateOverlays() {
  overlays.forEach((o, i) => {
    const target = targetOpacity(scrollProgress, o.start, o.end);
    currentOpacities[i] += (target - currentOpacities[i]) * 0.08;
    const op = currentOpacities[i];
    o.el.style.opacity = op;

    const mid = (o.start + o.end) / 2;
    const dir = scrollProgress > mid ? -1 : 1;

    const cx = mouseLag.x * (o.xMult || 0);
    const cy = mouseLag.y * -(o.yMult || 0);

    // Text emerges from deep space: small+blurry → full size+sharp
    const scale = 0.72 + op * 0.28;
    const blur  = (1 - op) * 7;

    if (o.el.id === "o3") {
      const riseY  = -op * window.innerHeight * 0.32;
      const driftY = (1 - op) * 40 * dir;
      o.el.style.filter    = `blur(${blur}px)`;
      o.el.style.transform = `translate(${cx}px, ${riseY + driftY + cy}px) scale(${scale})`;
    } else if (o.el.id === "scroll-cue") {
      const y = (1 - op) * 40 * dir;
      o.el.style.transform = `translateX(calc(-50% + ${cx}px)) translateY(${y + cy}px)`;
    } else {
      const y = (1 - op) * 40 * dir;
      o.el.style.filter    = `blur(${blur}px)`;
      o.el.style.transform = `translate(${cx}px, ${y + cy}px) scale(${scale})`;
    }
  });
}


// ── 8. UPDATE ─────────────────────────────────────────────────────────────────

const REPULSION_RADIUS   = 18;
const REPULSION_STRENGTH = 0.55;
const RETURN_SPEED       = 0.035;
const DRIFT_AMPLITUDE    = 1.8;
const DRIFT_SPEED        = 0.2;

// Pulse / ripple on click
// Wave travels ACROSS the sphere surface (arc-length), not radially outward from center.
// This way particles at the same radius get hit at different times as the ring sweeps down.
const WAVE_SPEED    = 14;  // slower so tight ring lingers on each particle longer
const WAVE_DURATION = 4.0; // long enough for wave to cross full sphere
const WAVE_WIDTH_SQ = 1.5; // sigma=1.2 — tight ring, sharp falloff on both sides
const WAVE_FORCE    = 1.0; // stronger punch
const WAVE_DECAY    = 2.0; // slower decay — force at ~14% by t=1s, gentle tail

const clock = new THREE.Clock();

function updateAll() {
  const t   = clock.getElapsedTime();
  const pos = geometry.attributes.position.array;
  const col = geometry.attributes.color.array;

  const gather = scrollProgress; // 0 = scattered, 1 = fully converged

  // Camera zooms in as particles converge
  const targetZ = 80 - gather * 28;
  camera.position.z += (targetZ - camera.position.z) * 0.04;

  // Line opacity rises as particles converge — the collapsing web glows
  lineMat.opacity = 0.13 + gather * 0.18;

  // Sphere-surface cursor: find where cursor ray hits the sphere, used for local color highlight
  if (mouseActive && gather > 0.5) {
    _sphereNDC.set(mouse.x, mouse.y);
    _sphereRay.setFromCamera(_sphereNDC, camera);
    if (_sphereRay.ray.intersectSphere(_hitSphereGeo, _sphereHit)) {
      group.worldToLocal(_sphereHit);
      cursorSphereDir.copy(_sphereHit).normalize();
    }
  }

  // Option A: cursor drifts to origin, stays alive through 92% of gather, locks off at finale
  const cursorScale = gather >= 0.92 ? 0 : Math.max(0.08, 1 - gather);
  const cx = mouse.x * cursorScale * (FIELD_SIZE / 2);
  const cy = mouse.y * cursorScale * (FIELD_SIZE / 2);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const pi    = i * 3;
    const phase = i * 2.399; // golden angle offset — no two particles in sync

    // Ambient drift: update the lerp rest target (breathing, alive at rest)
    basePositions[pi]     = originalPositions[pi]     + Math.sin(t * DRIFT_SPEED + phase)              * DRIFT_AMPLITUDE;
    basePositions[pi + 1] = originalPositions[pi + 1] + Math.cos(t * DRIFT_SPEED * 0.7 + phase * 1.3) * DRIFT_AMPLITUDE;
    basePositions[pi + 2] = originalPositions[pi + 2] + Math.sin(t * DRIFT_SPEED * 0.5 + phase * 0.8) * DRIFT_AMPLITUDE * 0.4;

    // Gathering: converge to origin — 3D repulsion creates natural sphere cloud
    const tx = basePositions[pi]     * (1 - gather);
    const ty = basePositions[pi + 1] * (1 - gather);
    const tz = basePositions[pi + 2] * (1 - gather);

    // Smooth lerp toward gathering target
    pos[pi]     += (tx - pos[pi])     * RETURN_SPEED;
    pos[pi + 1] += (ty - pos[pi + 1]) * RETURN_SPEED;
    pos[pi + 2] += (tz - pos[pi + 2]) * RETURN_SPEED;

    // Cursor repulsion — 3D (z included so cluster forms sphere, not flat disc)
    const dx   = pos[pi]     - cx;
    const dy   = pos[pi + 1] - cy;
    const dz   = pos[pi + 2];       // cursor z = 0
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (mouseActive) {
      const repulseScale = 1 - gather * 0.8;
      if (dist < REPULSION_RADIUS && dist > 0 && repulseScale > 0) {
        const force = (REPULSION_RADIUS - dist) * REPULSION_STRENGTH * repulseScale;
        pos[pi]     += (dx / dist) * force;
        pos[pi + 1] += (dy / dist) * force;
        pos[pi + 2] += (dz / dist) * force;
      }

      // Color: gold → white (cursor proximity) + gold → blue-white (scroll convergence)
      const tCursor = Math.max(0, 1 - dist / COLOR_RADIUS);
      col[pi]     = Math.min(1, BASE_COLOR.r + (NEAR_COLOR.r - BASE_COLOR.r) * tCursor + (GATHER_COLOR.r - BASE_COLOR.r) * gather);
      col[pi + 1] = Math.min(1, BASE_COLOR.g + (NEAR_COLOR.g - BASE_COLOR.g) * tCursor + (GATHER_COLOR.g - BASE_COLOR.g) * gather);
      col[pi + 2] = Math.min(1, BASE_COLOR.b + (NEAR_COLOR.b - BASE_COLOR.b) * tCursor + (GATHER_COLOR.b - BASE_COLOR.b) * gather);
    } else {
      // No cursor yet: gold → blue-white from scroll only
      col[pi]     = BASE_COLOR.r + (GATHER_COLOR.r - BASE_COLOR.r) * gather;
      col[pi + 1] = BASE_COLOR.g + (GATHER_COLOR.g - BASE_COLOR.g) * gather;
      col[pi + 2] = BASE_COLOR.b + (GATHER_COLOR.b - BASE_COLOR.b) * gather;
    }

    // Sphere-surface color highlight — brightens particles near cursor's 3D position on sphere
    // Stars near cursor revert to gold — lerp from gather color back to BASE_COLOR
    if (mouseActive && gather > 0.5) {
      const distCenter = Math.sqrt(pos[pi]*pos[pi] + pos[pi+1]*pos[pi+1] + pos[pi+2]*pos[pi+2]);
      if (distCenter > 0.01) {
        const gatherFade = Math.min(1, (gather - 0.5) / 0.3);
        const dotCS      = (pos[pi]*cursorSphereDir.x + pos[pi+1]*cursorSphereDir.y + pos[pi+2]*cursorSphereDir.z) / distCenter;
        const proximity  = Math.max(0, (dotCS - 0.78) / 0.22) * gatherFade;
        // Vivid bright gold so the bloom on affected stars reads clearly warm/gold
        col[pi]     = col[pi]     * (1 - proximity) + 1.00 * proximity;
        col[pi + 1] = col[pi + 1] * (1 - proximity) + 0.82 * proximity;
        col[pi + 2] = col[pi + 2] * (1 - proximity) + 0.28 * proximity;
      }
    }

    // Surface ripple — wave ring travels across sphere surface from top (0,1,0)
    // Uses arc-length distance so all shell particles are NOT hit simultaneously
    const waveElapsed = t - clickTime;
    if (waveElapsed >= 0 && waveElapsed < WAVE_DURATION) {
      const waveArc = waveElapsed * WAVE_SPEED;
      const px = pos[pi], py = pos[pi + 1], pz = pos[pi + 2];
      const distCenter = Math.sqrt(px * px + py * py + pz * pz);

      if (distCenter > 0.01) {
        // Angular distance from click point on sphere surface, expressed as arc length
        const dot     = Math.max(-1, Math.min(1,
          (px * rippleOrigin.x + py * rippleOrigin.y + pz * rippleOrigin.z) / distCenter
        ));
        const arcDist = Math.acos(dot) * distCenter;

        const distToFront = arcDist - waveArc;
        const wavePush    = Math.exp(-(distToFront * distToFront) / WAVE_WIDTH_SQ);
        const scatterScale  = 1 + (1 - scrollProgress) * 9; // ~10x at scatter, 1x at convergence
        const decayedForce = WAVE_FORCE * scatterScale * Math.exp(-waveElapsed * WAVE_DECAY);

        pos[pi]     += (px / distCenter) * wavePush * decayedForce;
        pos[pi + 1] += (py / distCenter) * wavePush * decayedForce;
        pos[pi + 2] += (pz / distCenter) * wavePush * decayedForce;
      }
    }
  }

  geometry.attributes.position.needsUpdate = true;
  geometry.attributes.color.needsUpdate    = true;

  // Update constellation line endpoints from live particle positions
  const lp = linePositions;
  for (let p = 0; p < pairs.length; p += 2) {
    const a  = pairs[p] * 3;
    const b  = pairs[p + 1] * 3;
    const li = (p / 2) * 6;
    lp[li]     = pos[a];     lp[li + 1] = pos[a + 1]; lp[li + 2] = pos[a + 2];
    lp[li + 3] = pos[b];     lp[li + 4] = pos[b + 1]; lp[li + 5] = pos[b + 2];
  }
  lineGeo.attributes.position.needsUpdate = true;
}


// ── 9. ANIMATION LOOP ─────────────────────────────────────────────────────────

const heroContent = document.querySelector(".hero-content");

function animate() {
  requestAnimationFrame(animate);

  // During scatter: cursor tilts the field (fades out mid-scroll as gather takes over)
  // During convergence: cursor spins the completed sphere (fades back in at high gather)
  const g = scrollProgress;
  const scatterTilt = Math.max(0, 1 - g * 2.5);        // 1→0 over first 40% of scroll
  const sphereSpin  = Math.max(0, (g - 0.85) / 0.15);  // 0→1 over last 15% of scroll
  const tiltScale   = scatterTilt + sphereSpin;

  mouseLag.x += (mouse.x - mouseLag.x) * 0.03;
  mouseLag.y += (mouse.y - mouseLag.y) * 0.03;
  // Auto-rotate grows in as sphere converges, revealing 3D depth
  autoRotateY += 0.003 * g;
  group.rotation.y =  mouseLag.x * 0.3 * tiltScale + autoRotateY;
  group.rotation.x = -mouseLag.y * 0.3 * tiltScale;

  // Hero: subtle cursor parallax on content block
  // Applied to the wrapper so GSAP's per-element scroll animations aren't affected
  if (heroContent) {
    heroContent.style.transform = `translate(${mouseLag.x * 14}px, ${mouseLag.y * -7}px)`;
  }

  updateAll();
  updateOverlays();
  updateAudio();
  updateCanvasCursor();
  updateClickCue();

  composer.render();
}

// ── 10. GENERATIVE AUDIO ──────────────────────────────────────────────────────

/*
  Signal chain:
  Pad (5 detuned sines, A2→E3 with scroll) ──┐
  Shimmer (3 sines at A5, rises with scroll) ─┼→ pannerNode → masterGain → out
  Melody (single sine, slow pentatonic motif) ┘

  No noise. Pure oscillators only.
  updateAudio() runs every frame — updates pad frequency + shimmer gain + stereo pan.
*/

let audioCtx    = null;
let masterGain  = null;
let pannerNode  = null;
let audioReady  = false;
let muted       = false;

// Scroll-reactive refs — updated each frame in updateAudio()
let padOscs        = [];   // [{ osc, detune }] — rising pad
let shimmerBus     = null; // convergence shimmer, rises with scrollProgress
let starShimmerBus = null; // star shimmer, appears when stars come into view
let noiseBus       = null; // bandpass noise texture
let padBus         = null; // pad layer bus
let pucciniGain    = null; // dedicated gain for Puccini fade

// Pad center frequency: Bb1 (scatter) → Bb3 (convergence) — matches Puccini key
const PAD_FREQ_LOW  = 58.27;
const PAD_FREQ_HIGH = 233.08;

// ── Puccini Humming Chorus — MIDI note data [start_s, dur_s, hz] ─────────────
// Extracted from 1406humming.mid (classicalmidi.co.uk), Bb major, 183s, loops
const PUCCINI_DURATION = 183.17;
const PUCCINI_SOPRANO = [[14.363,6.269,466.16],[20.632,0.896,523.25],[21.527,6.269,587.33],[27.796,0.448,523.25],[28.244,0.448,466.16],[28.692,6.269,523.25],[34.96,0.448,466.16],[35.408,0.448,440.0],[35.856,7.149,466.16],[43.02,5.373,698.46],[48.393,1.343,783.99],[49.736,0.448,622.25],[50.184,5.373,698.46],[55.557,1.343,783.99],[56.901,0.448,622.25],[57.348,5.373,587.33],[62.721,1.343,466.16],[64.065,0.448,392.0],[64.513,6.269,523.25],[70.781,0.448,349.23],[71.229,0.448,440.0],[71.677,6.269,466.16],[77.945,0.896,523.25],[78.841,6.269,587.33],[85.11,0.448,523.25],[85.557,0.448,466.16],[86.005,6.269,523.25],[92.274,0.448,466.16],[92.721,0.448,440.0],[93.169,7.164,466.16],[100.333,5.373,932.33],[105.707,1.343,830.61],[107.05,0.448,698.46],[107.498,1.791,622.25],[109.289,1.343,698.46],[110.632,0.448,587.33],[111.08,5.373,523.25],[116.453,1.343,587.33],[117.796,0.448,392.0],[118.244,4.478,622.25],[122.721,0.896,587.33],[123.617,0.597,523.25],[124.214,0.597,466.16],[124.811,0.522,392.0],[125.408,5.373,698.46],[130.781,1.343,783.99],[132.124,0.448,622.25],[132.572,5.373,698.46],[137.945,1.343,783.99],[139.289,0.448,622.25],[139.736,1.791,587.33],[141.527,3.134,587.33],[144.662,0.448,466.16],[145.109,1.343,523.25],[146.453,0.448,466.16],[146.901,5.821,466.16],[153.169,0.448,349.23],[153.617,0.448,440.0],[154.065,5.821,466.16],[160.333,0.448,349.23],[160.781,0.448,440.0],[161.229,3.582,466.16],[164.811,3.582,587.33],[168.393,3.582,698.46],[171.975,3.582,783.99],[175.557,7.612,932.33]];
const PUCCINI_TENOR   = [[14.363,6.269,233.08],[20.632,0.896,261.63],[21.527,6.269,293.66],[27.796,0.448,261.63],[28.244,0.448,233.08],[28.692,6.269,261.63],[34.96,0.448,233.08],[35.408,0.448,220.0],[35.856,7.142,233.08],[43.02,5.373,349.23],[48.393,1.343,392.0],[49.736,0.448,311.13],[50.184,5.373,349.23],[55.557,1.343,392.0],[56.901,0.448,311.13],[57.348,5.373,293.66],[62.721,1.343,233.08],[64.065,0.448,196.0],[64.513,6.269,261.63],[70.781,0.448,174.61],[71.229,0.448,220.0],[71.677,6.269,233.08],[77.945,0.896,261.63],[78.841,6.269,293.66],[85.11,0.448,261.63],[85.557,0.448,233.08],[86.005,6.269,261.63],[92.274,0.448,233.08],[92.721,0.448,220.0],[93.169,7.164,233.08],[100.333,5.373,466.16],[105.707,1.343,415.3],[107.05,0.448,349.23],[107.498,1.791,311.13],[109.289,1.343,349.23],[110.632,0.448,293.66],[111.08,5.373,261.63],[116.453,1.343,293.66],[117.796,0.448,196.0],[118.244,4.478,311.13],[122.721,0.896,293.66],[123.617,0.597,261.63],[124.214,0.597,233.08],[124.811,0.522,196.0],[125.408,5.373,349.23],[130.781,1.343,392.0],[132.124,0.448,311.13],[132.572,5.373,349.23],[137.945,1.343,392.0],[139.289,0.448,311.13],[139.736,1.791,293.66],[141.527,3.134,293.66],[144.662,0.448,233.08],[145.109,1.343,261.63],[146.453,0.448,233.08],[146.901,5.821,233.08],[153.169,0.448,174.61],[153.617,0.448,220.0],[154.065,5.821,233.08],[160.333,0.448,174.61],[160.781,0.448,220.0],[161.229,3.582,233.08],[164.811,3.582,293.66],[168.393,3.582,349.23],[171.975,3.582,392.0],[175.557,7.612,466.16]];
const PUCCINI_HARMONY = [[8.095,0.224,293.66],[8.095,0.224,349.23],[8.095,0.224,466.16],[8.542,0.224,261.63],[8.542,0.224,311.13],[8.542,0.224,349.23],[8.99,0.224,293.66],[8.99,0.224,349.23],[8.99,0.224,466.16],[9.886,0.224,349.23],[9.886,0.224,466.16],[9.886,0.224,587.33],[10.781,0.224,466.16],[10.781,0.224,587.33],[10.781,0.224,698.46],[11.677,0.224,349.23],[11.677,0.224,466.16],[11.677,0.224,587.33],[12.572,0.224,293.66],[12.572,0.224,349.23],[12.572,0.224,466.16],[15.259,0.224,293.66],[15.259,0.224,349.23],[15.259,0.224,466.16],[15.707,0.224,261.63],[15.707,0.224,311.13],[15.707,0.224,349.23],[16.154,0.224,293.66],[16.154,0.224,349.23],[16.154,0.224,466.16],[17.05,0.224,349.23],[17.05,0.224,466.16],[17.05,0.224,587.33],[17.945,0.224,466.16],[17.945,0.224,587.33],[17.945,0.224,698.46],[18.841,0.224,349.23],[18.841,0.224,466.16],[18.841,0.224,587.33],[19.736,0.224,293.66],[19.736,0.224,349.23],[19.736,0.224,466.16],[22.423,0.224,293.66],[22.423,0.224,349.23],[22.423,0.224,466.16],[22.871,0.224,261.63],[22.871,0.224,311.13],[22.871,0.224,349.23],[23.319,0.224,293.66],[23.319,0.224,349.23],[23.319,0.224,466.16],[24.214,0.224,349.23],[24.214,0.224,466.16],[24.214,0.224,587.33],[25.11,0.224,466.16],[25.11,0.224,587.33],[25.11,0.224,698.46],[26.005,0.224,349.23],[26.005,0.224,466.16],[26.005,0.224,587.33],[26.901,0.224,293.66],[26.901,0.224,349.23],[26.901,0.224,466.16],[29.587,0.224,311.13],[29.587,0.224,392.0],[29.587,0.224,523.25],[30.035,0.224,293.66],[30.035,0.224,311.13],[30.035,0.224,392.0],[30.483,0.224,311.13],[30.483,0.224,392.0],[30.483,0.224,523.25],[31.378,0.224,392.0],[31.378,0.224,523.25],[31.378,0.224,622.25],[32.274,0.224,523.25],[32.274,0.224,622.25],[32.274,0.224,783.99],[33.169,0.224,392.0],[33.169,0.224,523.25],[33.169,0.224,622.25],[34.065,0.224,311.13],[34.065,0.224,392.0],[34.065,0.224,523.25],[36.751,0.224,293.66],[36.751,0.224,349.23],[36.751,0.224,466.16],[37.199,0.224,261.63],[37.199,0.224,311.13],[37.199,0.224,349.23],[37.647,0.224,293.66],[37.647,0.224,349.23],[37.647,0.224,466.16],[38.542,0.224,349.23],[38.542,0.224,466.16],[38.542,0.224,587.33],[39.438,0.224,466.16],[39.438,0.224,587.33],[39.438,0.224,698.46],[40.333,0.224,349.23],[40.333,0.224,466.16],[40.333,0.224,587.33],[41.229,0.224,293.66],[41.229,0.224,349.23],[41.229,0.224,466.16],[43.02,5.373,349.23],[48.393,1.343,392.0],[49.736,0.448,311.13],[50.184,5.373,349.23],[55.557,1.343,392.0],[56.901,0.448,311.13],[57.348,7.164,293.66],[64.513,5.821,261.63],[72.572,0.224,293.66],[72.572,0.224,349.23],[72.572,0.224,466.16],[73.02,0.224,261.63],[73.02,0.224,311.13],[73.02,0.224,349.23],[73.468,0.224,293.66],[73.468,0.224,349.23],[73.468,0.224,466.16],[74.363,0.224,349.23],[74.363,0.224,466.16],[74.363,0.224,587.33],[75.259,0.224,466.16],[75.259,0.224,587.33],[75.259,0.224,698.46],[76.154,0.224,349.23],[76.154,0.224,466.16],[76.154,0.224,587.33],[77.05,0.224,293.66],[77.05,0.224,349.23],[77.05,0.224,466.16],[79.736,0.224,293.66],[79.736,0.224,349.23],[79.736,0.224,466.16],[80.184,0.224,261.63],[80.184,0.224,311.13],[80.184,0.224,349.23],[80.632,0.224,293.66],[80.632,0.224,349.23],[80.632,0.224,466.16],[81.527,0.224,349.23],[81.527,0.224,466.16],[81.527,0.224,587.33],[82.423,0.224,466.16],[82.423,0.224,587.33],[82.423,0.224,698.46],[83.318,0.224,349.23],[83.318,0.224,466.16],[83.318,0.224,587.33],[84.214,0.224,293.66],[84.214,0.224,349.23],[84.214,0.224,466.16],[86.901,0.224,311.13],[86.901,0.224,392.0],[86.901,0.224,523.25],[87.348,0.224,293.66],[87.348,0.224,311.13],[87.348,0.224,392.0],[87.796,0.224,311.13],[87.796,0.224,392.0],[87.796,0.224,523.25],[88.692,0.224,392.0],[88.692,0.224,523.25],[88.692,0.224,622.25],[89.587,0.224,523.25],[89.587,0.224,622.25],[89.587,0.224,783.99],[90.483,0.224,392.0],[90.483,0.224,523.25],[90.483,0.224,622.25],[91.378,0.224,311.13],[91.378,0.224,392.0],[91.378,0.224,523.25],[94.065,0.224,293.66],[94.065,0.224,349.23],[94.065,0.224,466.16],[94.513,0.224,261.63],[94.513,0.224,311.13],[94.513,0.224,349.23],[94.96,0.224,293.66],[94.96,0.224,349.23],[94.96,0.224,466.16],[95.856,0.224,349.23],[95.856,0.224,466.16],[95.856,0.224,587.33],[96.751,0.224,466.16],[96.751,0.224,587.33],[96.751,0.224,698.46],[97.647,0.224,349.23],[97.647,0.224,466.16],[97.647,0.224,587.33],[98.542,0.224,293.66],[98.542,0.224,349.23],[98.542,0.224,466.16],[100.333,5.373,466.16],[105.707,1.343,415.3],[107.05,0.448,349.23],[107.498,1.791,311.13],[109.289,1.343,349.23],[110.632,0.448,293.66],[111.08,4.478,261.63],[147.796,0.224,293.66],[147.796,0.224,349.23],[147.796,0.224,466.16],[148.244,0.224,261.63],[148.244,0.224,311.13],[148.244,0.224,349.23],[148.692,0.224,293.66],[148.692,0.224,349.23],[148.692,0.224,466.16],[149.587,0.224,349.23],[149.587,0.224,466.16],[149.587,0.224,587.33],[150.483,0.224,466.16],[150.483,0.224,587.33],[150.483,0.224,698.46],[151.378,0.224,349.23],[151.378,0.224,466.16],[151.378,0.224,587.33],[152.274,0.224,293.66],[152.274,0.224,349.23],[152.274,0.224,466.16],[154.96,0.224,293.66],[154.96,0.224,349.23],[154.96,0.224,466.16],[155.408,0.224,261.63],[155.408,0.224,311.13],[155.408,0.224,349.23],[155.856,0.224,293.66],[155.856,0.224,349.23],[155.856,0.224,466.16],[156.751,0.224,349.23],[156.751,0.224,466.16],[156.751,0.224,587.33],[157.647,0.224,466.16],[157.647,0.224,587.33],[157.647,0.224,698.46],[158.542,0.224,349.23],[158.542,0.224,466.16],[158.542,0.224,587.33],[159.438,0.224,293.66],[159.438,0.224,349.23],[159.438,0.224,466.16],[179.139,4.03,466.16],[179.139,4.03,587.33],[179.139,4.03,698.46]];
const PUCCINI_STRINGS1 = [[8.095,0.448,466.16],[8.542,0.448,349.23],[8.99,0.448,466.16],[9.886,0.448,587.33],[10.781,0.448,698.46],[11.677,0.448,587.33],[12.572,0.448,466.16],[15.259,0.448,466.16],[15.707,0.448,349.23],[16.154,0.448,466.16],[17.05,0.448,587.33],[17.945,0.448,698.46],[18.841,0.448,587.33],[19.736,0.448,466.16],[22.423,0.448,466.16],[22.871,0.448,349.23],[23.319,0.448,466.16],[24.214,0.448,587.33],[25.11,0.448,698.46],[26.005,0.448,587.33],[26.901,0.448,466.16],[29.587,0.448,523.25],[30.035,0.448,392.0],[30.483,0.448,523.25],[31.378,0.448,622.25],[32.274,0.448,783.99],[33.169,0.448,622.25],[34.065,0.448,523.25],[34.96,0.448,311.13],[36.751,0.448,466.16],[37.199,0.448,349.23],[37.647,0.448,466.16],[38.542,0.448,587.33],[39.438,0.448,698.46],[40.333,0.448,587.33],[41.229,0.448,466.16],[43.916,0.448,698.46],[44.363,0.448,523.25],[44.811,0.448,698.46],[45.707,0.448,880.0],[46.602,0.448,1046.5],[47.498,0.448,880.0],[49.289,0.448,783.99],[51.08,0.448,698.46],[51.527,0.448,523.25],[51.975,0.448,698.46],[52.871,0.448,880.0],[53.766,0.448,1046.5],[54.662,0.448,880.0],[56.453,0.448,783.99],[58.244,0.448,587.33],[58.692,0.448,440.0],[59.139,0.448,587.33],[60.035,0.448,739.99],[60.93,0.448,880.0],[61.826,0.448,739.99],[63.617,0.448,466.16],[65.408,0.448,349.23],[65.856,0.448,261.63],[66.304,0.448,349.23],[67.199,0.448,440.0],[68.095,0.448,523.25],[68.99,0.448,440.0],[69.886,0.448,349.23],[72.572,0.448,466.16],[73.02,0.448,349.23],[73.468,0.448,466.16],[74.363,0.448,587.33],[75.259,0.448,698.46],[76.154,0.448,587.33],[77.05,0.448,466.16],[79.736,0.448,466.16],[80.184,0.448,349.23],[80.632,0.448,466.16],[81.527,0.448,587.33],[82.423,0.448,698.46],[83.318,0.448,587.33],[84.214,0.448,466.16],[86.901,0.448,523.25],[87.348,0.448,392.0],[87.796,0.448,523.25],[88.692,0.448,622.25],[89.587,0.448,783.99],[90.483,0.448,622.25],[91.378,0.448,523.25],[92.274,0.448,311.13],[94.065,0.448,466.16],[94.513,0.448,349.23],[94.96,0.448,466.16],[95.856,0.448,587.33],[96.751,0.448,698.46],[97.647,0.448,587.33],[98.542,0.448,466.16],[101.229,0.448,392.0],[101.677,0.448,466.16],[102.124,0.448,587.33],[103.02,0.448,783.99],[103.915,0.448,932.33],[104.811,0.448,783.99],[106.602,0.448,261.63],[106.602,0.448,415.3],[108.393,0.448,196.0],[108.393,0.448,311.13],[110.184,0.448,233.08],[110.184,0.448,349.23],[111.975,0.448,261.63],[112.423,0.448,311.13],[112.871,0.448,415.3],[113.766,0.448,311.13],[114.662,0.448,523.25],[115.557,0.448,415.3],[117.348,0.448,493.88],[119.139,0.448,523.25],[119.587,0.448,392.0],[120.035,0.448,523.25],[120.93,0.448,622.25],[121.826,0.448,783.99],[126.304,0.448,349.23],[126.751,0.448,261.63],[127.199,0.448,349.23],[128.095,0.448,440.0],[128.99,0.448,523.25],[129.886,0.448,440.0],[131.677,0.448,466.16],[133.468,0.448,349.23],[133.915,0.448,261.63],[134.363,0.448,349.23],[135.259,0.448,440.0],[136.154,0.448,523.25],[137.05,0.448,440.0],[138.841,0.448,466.16],[140.632,0.448,440.0],[142.423,0.448,440.0],[144.214,0.448,392.0],[146.005,0.448,349.23],[147.796,0.448,466.16],[148.244,0.448,349.23],[148.692,0.448,466.16],[149.587,0.448,587.33],[150.483,0.448,698.46],[151.378,0.448,587.33],[152.274,0.448,466.16],[154.96,0.448,466.16],[155.408,0.448,349.23],[155.856,0.448,466.16],[156.751,0.448,587.33],[157.647,0.448,698.46],[158.542,0.448,587.33],[159.438,0.448,466.16],[177.348,5.821,1174.66],[177.348,5.821,1864.66]];
const PUCCINI_STRINGS2 = [[8.095,0.448,349.23],[8.542,0.448,311.13],[8.99,0.448,349.23],[9.886,0.448,466.16],[10.781,0.448,587.33],[11.677,0.448,466.16],[12.572,0.448,349.23],[15.259,0.448,349.23],[15.707,0.448,311.13],[16.154,0.448,349.23],[17.05,0.448,466.16],[17.945,0.448,587.33],[18.841,0.448,466.16],[19.736,0.448,349.23],[22.423,0.448,349.23],[22.871,0.448,311.13],[23.319,0.448,349.23],[24.214,0.448,466.16],[25.11,0.448,587.33],[26.005,0.448,466.16],[26.901,0.448,349.23],[29.587,0.448,392.0],[30.035,0.448,311.13],[30.483,0.448,392.0],[31.378,0.448,523.25],[32.274,0.448,622.25],[33.169,0.448,523.25],[34.065,0.448,392.0],[34.96,0.448,261.63],[36.751,0.448,349.23],[37.199,0.448,311.13],[37.647,0.448,349.23],[38.542,0.448,466.16],[39.438,0.448,587.33],[40.333,0.448,466.16],[41.229,0.448,349.23],[43.916,0.448,523.25],[44.363,0.448,466.16],[44.811,0.448,523.25],[45.707,0.448,698.46],[46.602,0.448,880.0],[47.498,0.448,698.46],[49.289,0.448,622.25],[51.08,0.448,523.25],[51.527,0.448,466.16],[51.975,0.448,523.25],[52.871,0.448,698.46],[53.766,0.448,880.0],[54.662,0.448,698.46],[56.453,0.448,622.25],[58.244,0.448,440.0],[58.692,0.448,392.0],[59.139,0.448,440.0],[60.035,0.448,587.33],[60.93,0.448,739.99],[61.826,0.448,587.33],[63.617,0.448,392.0],[65.408,0.448,261.63],[65.856,0.448,233.08],[66.304,0.448,261.63],[67.199,0.448,349.23],[68.095,0.448,392.0],[68.99,0.448,311.13],[69.886,0.448,311.13],[72.572,0.448,349.23],[73.02,0.448,311.13],[73.468,0.448,349.23],[74.363,0.448,466.16],[75.259,0.448,587.33],[76.154,0.448,466.16],[77.05,0.448,349.23],[79.736,0.448,349.23],[80.184,0.448,311.13],[80.632,0.448,349.23],[81.527,0.448,466.16],[82.423,0.448,587.33],[83.318,0.448,466.16],[84.214,0.448,349.23],[86.901,0.448,392.0],[87.348,0.448,311.13],[87.796,0.448,392.0],[88.692,0.448,523.25],[89.587,0.448,622.25],[90.483,0.448,523.25],[91.378,0.448,392.0],[92.274,0.448,261.63],[94.065,0.448,349.23],[94.513,0.448,311.13],[94.96,0.448,349.23],[95.856,0.448,466.16],[96.751,0.448,587.33],[97.647,0.448,466.16],[98.542,0.448,349.23],[101.229,0.448,293.66],[101.677,0.448,392.0],[102.124,0.448,466.16],[103.02,0.448,587.33],[103.915,0.448,783.99],[104.811,0.448,587.33],[106.602,0.448,311.13],[108.393,0.448,261.63],[110.184,0.448,293.66],[111.975,0.448,207.65],[112.423,0.448,261.63],[112.871,0.448,311.13],[113.766,0.448,261.63],[114.662,0.448,415.3],[115.557,0.448,311.13],[117.348,0.448,392.0],[119.139,0.448,392.0],[119.587,0.448,311.13],[120.035,0.448,392.0],[120.93,0.448,523.25],[121.826,0.448,622.25],[126.304,0.448,261.63],[126.751,0.448,233.08],[127.199,0.448,261.63],[128.095,0.448,349.23],[128.99,0.448,440.0],[129.886,0.448,349.23],[131.677,0.448,392.0],[133.468,0.448,261.63],[133.915,0.448,233.08],[134.363,0.448,261.63],[135.259,0.448,349.23],[136.154,0.448,440.0],[137.05,0.448,349.23],[138.841,0.448,392.0],[140.632,0.448,369.99],[142.423,0.448,293.66],[144.214,0.448,311.13],[146.005,0.448,311.13],[147.796,0.448,349.23],[148.244,0.448,311.13],[148.692,0.448,349.23],[149.587,0.448,466.16],[150.483,0.448,587.33],[151.378,0.448,466.16],[152.274,0.448,349.23],[154.96,0.448,349.23],[155.408,0.448,311.13],[155.856,0.448,349.23],[156.751,0.448,466.16],[157.647,0.448,587.33],[158.542,0.448,466.16],[159.438,0.448,349.23],[177.348,5.821,1396.91]];
const PUCCINI_STRINGS3 = [[8.095,0.448,293.66],[8.542,0.448,261.63],[8.99,0.448,293.66],[9.886,0.448,349.23],[10.781,0.448,466.16],[11.677,0.448,349.23],[12.572,0.448,293.66],[15.259,0.448,293.66],[15.707,0.448,261.63],[16.154,0.448,293.66],[17.05,0.448,349.23],[17.945,0.448,466.16],[18.841,0.448,349.23],[19.736,0.448,293.66],[22.423,0.448,293.66],[22.871,0.448,261.63],[23.319,0.448,293.66],[24.214,0.448,349.23],[25.11,0.448,466.16],[26.005,0.448,349.23],[26.901,0.448,293.66],[29.587,0.448,311.13],[30.035,0.448,293.66],[30.483,0.448,311.13],[31.378,0.448,392.0],[32.274,0.448,523.25],[33.169,0.448,392.0],[34.065,0.448,311.13],[36.751,0.448,293.66],[37.199,0.448,261.63],[37.647,0.448,293.66],[38.542,0.448,349.23],[39.438,0.448,466.16],[40.333,0.448,349.23],[41.229,0.448,293.66],[43.916,0.448,440.0],[44.363,0.448,392.0],[44.811,0.448,440.0],[45.707,0.448,523.25],[46.602,0.448,698.46],[47.498,0.448,523.25],[49.289,0.448,466.16],[51.08,0.448,440.0],[51.527,0.448,392.0],[51.975,0.448,440.0],[52.871,0.448,523.25],[53.766,0.448,698.46],[54.662,0.448,523.25],[56.453,0.448,466.16],[58.244,0.448,369.99],[58.692,0.448,329.63],[59.139,0.448,369.99],[60.035,0.448,440.0],[60.93,0.448,587.33],[61.826,0.448,440.0],[63.617,0.448,293.66],[65.408,0.448,220.0],[65.856,0.448,196.0],[66.304,0.448,220.0],[67.199,0.448,261.63],[68.095,0.448,311.13],[68.99,0.448,261.63],[69.886,0.448,220.0],[72.572,0.448,293.66],[73.02,0.448,261.63],[73.468,0.448,293.66],[74.363,0.448,349.23],[75.259,0.448,466.16],[76.154,0.448,349.23],[77.05,0.448,293.66],[79.736,0.448,293.66],[80.184,0.448,261.63],[80.632,0.448,293.66],[81.527,0.448,349.23],[82.423,0.448,466.16],[83.318,0.448,349.23],[84.214,0.448,293.66],[86.901,0.448,311.13],[87.348,0.448,293.66],[87.796,0.448,311.13],[88.692,0.448,392.0],[89.587,0.448,523.25],[90.483,0.448,392.0],[91.378,0.448,311.13],[94.065,0.448,293.66],[94.513,0.448,261.63],[94.96,0.448,293.66],[95.856,0.448,349.23],[96.751,0.448,466.16],[97.647,0.448,349.23],[98.542,0.448,293.66],[101.229,0.448,233.08],[101.677,0.448,293.66],[102.124,0.448,392.0],[103.02,0.448,466.16],[103.915,0.448,587.33],[104.811,0.448,466.16],[106.602,0.448,207.65],[108.393,0.448,155.56],[110.184,0.448,174.61],[111.975,0.448,155.56],[112.423,0.448,207.65],[112.871,0.448,261.63],[113.766,0.448,207.65],[114.662,0.448,311.13],[115.557,0.448,261.63],[117.348,0.448,293.66],[119.139,0.448,311.13],[119.587,0.448,261.63],[120.035,0.448,311.13],[120.93,0.448,392.0],[121.826,0.448,523.25],[126.304,0.448,220.0],[126.751,0.448,196.0],[127.199,0.448,220.0],[128.095,0.448,261.63],[128.99,0.448,349.23],[129.886,0.448,261.63],[131.677,0.448,311.13],[133.468,0.448,220.0],[133.915,0.448,196.0],[134.363,0.448,220.0],[135.259,0.448,261.63],[136.154,0.448,349.23],[137.05,0.448,261.63],[138.841,0.448,311.13],[140.632,0.448,293.66],[142.423,0.448,233.08],[144.214,0.448,233.08],[146.005,0.448,220.0],[147.796,0.448,293.66],[148.244,0.448,261.63],[148.692,0.448,293.66],[149.587,0.448,349.23],[150.483,0.448,466.16],[151.378,0.448,349.23],[152.274,0.448,293.66],[154.96,0.448,293.66],[155.408,0.448,261.63],[155.856,0.448,293.66],[156.751,0.448,349.23],[157.647,0.448,466.16],[158.542,0.448,349.23],[159.438,0.448,293.66],[164.811,3.582,392.0],[168.393,3.582,293.66],[171.975,3.582,261.63],[176.453,3.134,233.08]];
// Track 4 "seq by Chiaki IKENOUE" — sustained bass/tenor pedal tones (5–14s each)
const PUCCINI_BASS = [[7.199,6.268,233.08],[14.363,6.269,233.08],[21.527,6.269,233.08],[27.796,0.896,233.08],[28.692,7.164,233.08],[35.856,6.269,233.08],[42.124,0.896,233.08],[43.02,7.164,233.08],[50.184,5.373,233.08],[55.557,1.343,392.0],[56.901,0.448,311.13],[57.348,5.373,220.0],[62.721,1.791,196.0],[64.513,5.821,174.61],[71.677,6.269,233.08],[78.841,6.269,233.08],[85.11,0.896,233.08],[86.005,7.164,233.08],[93.169,6.269,233.08],[99.438,0.896,233.08],[100.333,5.373,98.0],[105.707,1.791,87.31],[107.498,1.791,130.81],[109.289,1.791,146.83],[111.08,5.373,103.83],[116.453,1.791,98.0],[118.244,4.478,130.81],[125.408,5.373,155.56],[125.408,5.373,174.61],[130.781,1.791,155.56],[130.781,1.791,233.08],[132.572,5.373,155.56],[132.572,5.373,174.61],[146.901,6.269,233.08],[154.065,6.269,233.08],[161.229,14.328,233.08],[176.453,6.716,233.08]];

// Puccini voice configs: attack/release in seconds, release bleeds past note end for legato
const PUCCINI_VOICES = [
  { notes: PUCCINI_SOPRANO,  type: "sine",     gain: 0.18, filter: null, attack: 0.35, release: 1.2  },
  { notes: PUCCINI_TENOR,    type: "sine",     gain: 0.14, filter: null, attack: 0.35, release: 1.2  },
  { notes: PUCCINI_HARMONY,  type: "sine",     gain: 0.06, filter: null, attack: 0.2,  release: 0.8  },
  { notes: PUCCINI_STRINGS1, type: "sawtooth", gain: 0.03, filter: 1800, attack: 0.12, release: 0.5  },
  { notes: PUCCINI_STRINGS2, type: "sawtooth", gain: 0.03, filter: 1800, attack: 0.12, release: 0.5  },
  { notes: PUCCINI_STRINGS3, type: "sawtooth", gain: 0.025,filter: 1800, attack: 0.12, release: 0.5  },
  { notes: PUCCINI_BASS,     type: "sine",     gain: 0.16, filter: 600,  attack: 0.5,  release: 1.5  },
];

// Puccini scheduler state
const PUCCINI_TEMPO  = 1.4; // 1.0 = original, 2.0 = double speed
const PUCCINI_GAIN   = 2.0; // overall volume multiplier for all Puccini voices
let pucciniStartTime = 0;   // audioCtx.currentTime when piece started
let pucciniLoopOffset = 0;  // accumulates PUCCINI_DURATION each loop
let pucciniPointers = [];   // next-note index per voice
let pucciniInterval = null; // setInterval handle

const muteBtn        = document.getElementById("mute-btn");
const muteBtnFixed   = document.getElementById("mute-btn-fixed");
const allMuteBtns    = [muteBtn, muteBtnFixed].filter(Boolean);
const audioControls  = document.getElementById("audio-controls");
const volumeSlider   = document.getElementById("volume-slider");
let   userVolume     = 1.0; // 0–1, independent of mute

function initAudio() {
  if (audioReady) return;
  audioReady = true;

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();

  // Master — fades in over 5s
  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
  masterGain.gain.linearRampToValueAtTime(userVolume, audioCtx.currentTime + 5);
  masterGain.connect(audioCtx.destination);

  // Stereo panner — driven by mouse.x each frame
  pannerNode = audioCtx.createStereoPanner();
  pannerNode.pan.value = 0;
  pannerNode.connect(masterGain);

  // ── Dedicated gain for Puccini — fades independently at outro ───────────────
  pucciniGain = audioCtx.createGain();
  pucciniGain.gain.value = 1;
  pucciniGain.connect(pannerNode);

  // ── Noise texture: bandpass-filtered white noise, subtle undertone ──────────
  noiseBus = audioCtx.createGain();
  noiseBus.gain.value = 0.7;
  noiseBus.connect(pannerNode);

  const bufSize   = audioCtx.sampleRate * 2;
  const noiseBuf  = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
  const noiseData = noiseBuf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) noiseData[i] = Math.random() * 2 - 1;
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuf;
  noise.loop   = true;
  noise.start();

  // Mid wash — slowly sweeping bandpass
  const bp1 = audioCtx.createBiquadFilter();
  bp1.type  = "bandpass"; bp1.frequency.value = 500; bp1.Q.value = 1.2;
  const lfo1 = audioCtx.createOscillator();
  const lg1  = audioCtx.createGain();
  lfo1.frequency.value = 0.2; lg1.gain.value = 260;
  lfo1.connect(lg1); lg1.connect(bp1.frequency); lfo1.start();
  const g1 = audioCtx.createGain(); g1.gain.value = 0.5;
  noise.connect(bp1); bp1.connect(g1); g1.connect(noiseBus);

  // Low wash — slower sweep
  const bp2 = audioCtx.createBiquadFilter();
  bp2.type  = "bandpass"; bp2.frequency.value = 280; bp2.Q.value = 1.0;
  const lfo2 = audioCtx.createOscillator();
  const lg2  = audioCtx.createGain();
  lfo2.frequency.value = 0.11; lg2.gain.value = 140;
  lfo2.connect(lg2); lg2.connect(bp2.frequency); lfo2.start();
  const g2 = audioCtx.createGain(); g2.gain.value = 0.4;
  noise.connect(bp2); bp2.connect(g2); g2.connect(noiseBus);

  // ── Pad layer: 5 detuned sines, Bb1→Bb3 with scroll ────────────────────────
  padBus = audioCtx.createGain();
  padBus.gain.value = 0.55;
  padBus.connect(pannerNode);

  // Slow breath LFO on pad volume
  const breathLFO     = audioCtx.createOscillator();
  const breathLFOGain = audioCtx.createGain();
  breathLFO.frequency.value = 0.11;
  breathLFOGain.gain.value  = 0.07;
  breathLFO.connect(breathLFOGain);
  breathLFOGain.connect(padBus.gain);
  breathLFO.start();

  // 5 detuned sines — natural beating creates the "alive" quality
  const padDetunings = [-3.0, -1.2, 0, 1.5, 3.5];
  padOscs = padDetunings.map(detune => {
    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = PAD_FREQ_LOW + detune;
    gain.gain.value = 0.16;
    osc.connect(gain);
    gain.connect(padBus);
    osc.start();
    return { osc, detune };
  });

  // ── Constant root: Bb1 + Bb2 — anchors the Puccini key throughout ───────────
  const rootBus = audioCtx.createGain();
  rootBus.gain.value = 0.22;
  rootBus.connect(pannerNode);
  [58.27, 58.57, 57.97].forEach(f => {          // Bb1 cluster
    const osc = audioCtx.createOscillator();
    osc.type = "sine"; osc.frequency.value = f;
    osc.connect(rootBus); osc.start();
  });
  [116.54, 116.94, 116.14].forEach(f => {       // Bb2 cluster
    const osc = audioCtx.createOscillator();
    osc.type = "sine"; osc.frequency.value = f;
    osc.connect(rootBus); osc.start();
  });

  // ── Star shimmer: Bb6 (1864Hz), held at 0 until stars scroll into view ──────
  starShimmerBus = audioCtx.createGain();
  starShimmerBus.gain.value = 0;
  starShimmerBus.connect(pannerNode);

  [-3.0, 0, 3.0].forEach(detune => {
    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = 1864.66 + detune; // Bb6
    gain.gain.value = 0.18;
    osc.connect(gain);
    gain.connect(starShimmerBus);
    osc.start();
  });

  // ── Convergence shimmer: Bb5 (932Hz), fades in as sphere forms ──────────────
  shimmerBus = audioCtx.createGain();
  shimmerBus.gain.value = 0;
  shimmerBus.connect(pannerNode);

  [-2.5, 0, 2.5].forEach(detune => {
    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = 932.33 + detune; // Bb5
    gain.gain.value = 0.18;
    osc.connect(gain);
    gain.connect(shimmerBus);
    osc.start();
  });

  // ── Start Puccini scheduler ──────────────────────────────────────────────────
  pucciniStartTime = audioCtx.currentTime;
  pucciniLoopOffset = 0;
  pucciniPointers = PUCCINI_VOICES.map(() => 0);
  pucciniInterval = setInterval(runPucciniScheduler, 25);

  // ── UI ──────────────────────────────────────────────────────────────────────
  allMuteBtns.forEach(btn => { btn.innerHTML = SVG_ON; });
  if (audioControls) audioControls.style.opacity = "1";
  if (muteBtnFixed) muteBtnFixed.style.opacity = "1"; // override .mute-btn base opacity:0
  if (volumeSlider) {
    volumeSlider.value = userVolume;
    volumeSlider.addEventListener("input", () => {
      userVolume = parseFloat(volumeSlider.value);
      if (!muted) masterGain.gain.setTargetAtTime(userVolume, audioCtx.currentTime, 0.05);
    });
  }
  wireMuteButtons();
}

// ── Puccini lookahead scheduler ───────────────────────────────────────────────
// Runs every 25ms, schedules notes up to 150ms ahead.
// Each note gets its own OscillatorNode + GainNode (fire-and-forget, auto-GC on stop).
const SCHEDULE_AHEAD = 0.15; // seconds

function runPucciniScheduler() {
  if (!audioReady || audioCtx.state === "closed") return;

  const now = audioCtx.currentTime;
  const horizon = now + SCHEDULE_AHEAD;

  PUCCINI_VOICES.forEach((voice, vi) => {
    while (pucciniPointers[vi] < voice.notes.length) {
      const [noteSec, durRaw, hz] = voice.notes[pucciniPointers[vi]];
      const scaledStart = noteSec / PUCCINI_TEMPO;
      const scaledDur   = durRaw  / PUCCINI_TEMPO;
      const absStart = pucciniStartTime + pucciniLoopOffset + scaledStart;

      if (absStart > horizon) break; // not yet in window
      pucciniPointers[vi]++;

      if (absStart + scaledDur < now) continue; // already past

      // Build note: osc → [filter] → env → masterGain
      const osc = audioCtx.createOscillator();
      const env = audioCtx.createGain();
      osc.type = voice.type;
      osc.frequency.value = hz;

      if (voice.filter) {
        const filt = audioCtx.createBiquadFilter();
        filt.type = "lowpass";
        filt.frequency.value = voice.filter;
        osc.connect(filt);
        filt.connect(env);
      } else {
        osc.connect(env);
      }

      const durSec  = scaledDur;
      const attack  = Math.min(voice.attack, durSec * 0.4);
      const release = voice.release; // bleeds past note end into next note
      const sustain = Math.max(0, durSec - attack * 0.5); // sustain peak until near end
      const peak    = voice.gain * PUCCINI_GAIN;
      env.gain.setValueAtTime(0, absStart);
      env.gain.linearRampToValueAtTime(peak, absStart + attack);
      env.gain.setValueAtTime(peak, absStart + sustain);
      env.gain.linearRampToValueAtTime(0, absStart + sustain + release);

      env.connect(pucciniGain);
      osc.start(absStart);
      osc.stop(absStart + sustain + release + 0.05);
      osc.addEventListener("ended", () => { osc.disconnect(); env.disconnect(); });
    }

    // Loop: reset pointer and advance time offset when all notes are scheduled
    if (pucciniPointers[vi] >= voice.notes.length) {
      // Only advance the shared offset once (driven by voice 0)
      if (vi === 0) pucciniLoopOffset += PUCCINI_DURATION / PUCCINI_TEMPO;
      pucciniPointers[vi] = 0;
    }
  });
}

function playRippleSound() {
  if (!audioReady || audioCtx.state === "closed") return;
  const now = audioCtx.currentTime;

  // Reverb impulse response — 2.5s decaying noise for the thud room
  const reverbLen = audioCtx.sampleRate * 2.5;
  const irBuf = audioCtx.createBuffer(2, reverbLen, audioCtx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = irBuf.getChannelData(ch);
    for (let i = 0; i < reverbLen; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbLen, 2.8);
    }
  }
  const convolver = audioCtx.createConvolver();
  convolver.buffer = irBuf;
  const reverbWet = audioCtx.createGain();
  reverbWet.gain.value = 1.0; // wet level — boosted since dry is lower
  convolver.connect(reverbWet); reverbWet.connect(pannerNode);

  // Low thud — deep sine click, very short
  const thud = audioCtx.createOscillator();
  const thudEnv = audioCtx.createGain();
  thud.type = "sine";
  thud.frequency.setValueAtTime(120, now);
  thud.frequency.exponentialRampToValueAtTime(40, now + 0.18);
  thudEnv.gain.setValueAtTime(0.34, now);
  thudEnv.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
  thud.connect(thudEnv);
  thudEnv.connect(pannerNode);   // dry signal
  thudEnv.connect(convolver);    // wet/reverb signal
  thud.start(now); thud.stop(now + 1.25);
  thud.addEventListener("ended", () => { thud.disconnect(); thudEnv.disconnect(); convolver.disconnect(); reverbWet.disconnect(); });

  // High-pitched crystalline ping — triangle wave at Bb5, fades slowly

  const ping = audioCtx.createOscillator();
  const pingEnv = audioCtx.createGain();
  ping.type = "triangle";
  ping.frequency.value = 932.33; // Bb5
  pingEnv.gain.setValueAtTime(0.0, now);
  pingEnv.gain.linearRampToValueAtTime(0.36, now + 0.01);
  pingEnv.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
  ping.connect(pingEnv); pingEnv.connect(pannerNode);
  ping.start(now); ping.stop(now + 1.85);
  ping.addEventListener("ended", () => { ping.disconnect(); pingEnv.disconnect(); });

}

function updateAudio() {
  if (!audioReady) return;

  // Stereo pan follows cursor
  pannerNode.pan.setTargetAtTime(mouse.x * 0.8, audioCtx.currentTime, 0.1);

  // Pad center frequency rises Bb1→Bb3 — reaches top by ~30% of scroll
  const t = Math.min(1, scrollProgress / 0.3);
  const centerFreq = PAD_FREQ_LOW + (PAD_FREQ_HIGH - PAD_FREQ_LOW) * t;
  padOscs.forEach(({ osc, detune }) => {
    osc.frequency.setTargetAtTime(centerFreq + detune, audioCtx.currentTime, 2.0);
  });

  // Star shimmer and convergence shimmer — stop updating once outro takes over
  if (!outroAudioFired) {
    const starAmt = Math.min(1, scrollProgress * 8) * 0.12;
    starShimmerBus.gain.setTargetAtTime(starAmt, audioCtx.currentTime, 0.8);
    shimmerBus.gain.setTargetAtTime(scrollProgress * 0.32, audioCtx.currentTime, 1.5);
  }
}

// Mute toggle — only wires up after audio has started
const SVG_ON  = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
const SVG_OFF = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;

function wireMuteButtons() {
  allMuteBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      muted = !muted;
      masterGain.gain.setTargetAtTime(muted ? 0 : userVolume, audioCtx.currentTime, 0.3);
      allMuteBtns.forEach(b => { b.innerHTML = muted ? SVG_OFF : SVG_ON; });
    });
  });
}

// Suspend audio when tab is hidden, resume when visible again
document.addEventListener("visibilitychange", () => {
  if (!audioReady) return;
  if (document.hidden) {
    audioCtx.suspend();
  } else {
    audioCtx.resume();
  }
});

// Show fixed audio controls immediately on page load
if (audioControls) { audioControls.style.opacity = "1"; audioControls.style.transition = "none"; }
if (muteBtnFixed)  { muteBtnFixed.style.opacity  = "1"; muteBtnFixed.style.transition  = "none"; }

// Both buttons start audio on first press, then toggle
allMuteBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (!audioReady) { initAudio(); return; }
    // after init, toggle handled by wireMuteButtons
  });
});


// ── 10b. OUTRO AUDIO ──────────────────────────────────────────────────────────

let outroAudioFired = false;
let outroChordBus   = null; // ref so we can fade it out on scroll-back

function triggerOutroAudio() {
  if (!audioReady || outroAudioFired) return;
  outroAudioFired = true;
  const now = audioCtx.currentTime;

  // Fade out Puccini, then stop the scheduler
  if (pucciniGain) {
    pucciniGain.gain.setTargetAtTime(0, now, 1.2);
    setTimeout(() => { if (pucciniInterval) { clearInterval(pucciniInterval); pucciniInterval = null; } }, 5000);
  }

  // Fade out noise texture, pad, and both shimmers
  if (noiseBus)       noiseBus.gain.setTargetAtTime(0, now, 0.8);
  if (padBus)         padBus.gain.setTargetAtTime(0, now, 0.8);
  if (starShimmerBus) starShimmerBus.gain.setTargetAtTime(0, now, 0.6);
  if (shimmerBus)     shimmerBus.gain.setTargetAtTime(0, now, 0.6);

  // Bloom a Bb major chord after a 1.5s pause — slow 3s attack, held until scroll-back
  setTimeout(() => {
    if (!audioReady || audioCtx.state === "closed") return;
    const t = audioCtx.currentTime;
    outroChordBus = audioCtx.createGain();
    outroChordBus.gain.value = 0;
    outroChordBus.connect(pannerNode);

    [
      { hz: 116.54, gain: 0.22 }, // Bb2 — root
      { hz: 146.83, gain: 0.16 }, // D3  — major third
      { hz: 174.61, gain: 0.14 }, // F3  — fifth
      { hz: 233.08, gain: 0.10 }, // Bb3 — octave above root, soft
    ].forEach(({ hz, gain }) => {
      const osc = audioCtx.createOscillator();
      const env = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.value = hz;
      env.gain.value = gain;
      osc.connect(env); env.connect(outroChordBus);
      osc.start(t);
    });

    outroChordBus.gain.setValueAtTime(0, t);
    outroChordBus.gain.linearRampToValueAtTime(0.9, t + 3.0);
  }, 1500);
}

function restoreFromOutro() {
  if (!audioReady || !outroAudioFired) return;
  outroAudioFired = false;
  const now = audioCtx.currentTime;

  // Fade out the outro chord
  if (outroChordBus) {
    outroChordBus.gain.setTargetAtTime(0, now, 0.6);
    outroChordBus = null;
  }

  // Restore Puccini
  if (pucciniGain) pucciniGain.gain.setTargetAtTime(1, now, 1.0);
  if (!pucciniInterval) {
    pucciniStartTime  = audioCtx.currentTime;
    pucciniLoopOffset = 0;
    pucciniPointers   = PUCCINI_VOICES.map(() => 0);
    pucciniInterval   = setInterval(runPucciniScheduler, 25);
  }

  // Restore noise and pad (updateAudio restores shimmers via scrollProgress)
  if (noiseBus) noiseBus.gain.setTargetAtTime(0.7, now, 1.0);
  if (padBus)   padBus.gain.setTargetAtTime(0.55, now, 1.0);
}

// Trigger/restore as outro enters and leaves view
new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    triggerOutroAudio();
  } else {
    restoreFromOutro();
  }
}, { threshold: 0.15 }).observe(document.querySelector(".outro"));

// ── 11. OUTRO INTERACTIONS ────────────────────────────────────────────────────

const outro        = document.getElementById("outro");
const outroCard    = document.getElementById("outro-card");
const outroHeading = document.getElementById("outro-heading");
const outroCta     = document.getElementById("outro-cta");
const outroLabel   = document.getElementById("outro-label");
const outroGlow    = document.getElementById("outro-glow");

const MAX_TILT    = 24; // degrees — desktop mouse tilt
const MOBILE_TILT = 16; // degrees — touch drag tilt
const isTouchDevice = window.matchMedia("(hover: none)").matches;

// ── Touch drag tilt for mobile ────────────────────────────────────────────────
// Drag finger across the outro section to tilt the card. No permissions needed.
if (outro) {
  outro.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const rect  = outro.getBoundingClientRect();
    const nx = Math.max(-1, Math.min(1, (touch.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)));
    const ny = Math.max(-1, Math.min(1, (touch.clientY - rect.top  - rect.height / 2) / (rect.height / 2)));
    outroCard.style.transform = `rotateX(${-ny * MOBILE_TILT}deg) rotateY(${nx * MOBILE_TILT}deg)`;
  }, { passive: true });

  outro.addEventListener("touchend", () => {
    outroCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  }, { passive: true });
}

// Global mousemove — desktop only
window.addEventListener("mousemove", (e) => {
  if (isTouchDevice) return;
  const rect   = outro.getBoundingClientRect();
  const cardCx = rect.left + rect.width  / 2;
  const cardCy = rect.top  + rect.height / 2;

  // Offset from outro center, normalized by half-viewport so distance feels natural
  const nx = Math.max(-1, Math.min(1, (e.clientX - cardCx) / (window.innerWidth  / 2)));
  const ny = Math.max(-1, Math.min(1, (e.clientY - cardCy) / (window.innerHeight / 2)));

  // Card rotation — perspective + translateZ on children = natural parallax
  outroCard.style.transform = `rotateX(${-ny * MAX_TILT}deg) rotateY(${nx * MAX_TILT}deg)`;

  // Glow + magnetic only when cursor is actually inside the outro
  const inside = e.clientX >= rect.left && e.clientX <= rect.right &&
                 e.clientY >= rect.top  && e.clientY <= rect.bottom;

  outroGlow.style.opacity = inside ? "1" : "0";

  if (inside) {
    outroGlow.style.left = (e.clientX - rect.left) + "px";
    outroGlow.style.top  = (e.clientY - rect.top)  + "px";

    const ctaRect = outroCta.getBoundingClientRect();
    const dx      = e.clientX - (ctaRect.left + ctaRect.width  / 2);
    const dy      = e.clientY - (ctaRect.top  + ctaRect.height / 2);
    const dist    = Math.sqrt(dx * dx + dy * dy);
    const MAGNETIC_RADIUS   = 120;
    const MAGNETIC_STRENGTH = 0.35;

    if (dist < MAGNETIC_RADIUS) {
      const pull = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH;
      outroCta.style.transform = `translateZ(80px) translate(${dx * pull}px, ${dy * pull}px)`;
    } else {
      outroCta.style.transform = "translateZ(80px)";
    }
  } else {
    outroCta.style.transform = "translateZ(80px)";
  }
});

// ── 12. START ─────────────────────────────────────────────────────────────────
animate();
