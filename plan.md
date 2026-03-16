# Quiz Enhancement Fixes — Remaining Work

## Chunk 1: Security (DONE)
- [x] SSRF hardening — block private IPs, IPv6, cloud metadata
- [x] Rate limiting — 5 req/min per IP
- [x] GET → POST

## Chunk 2: Architecture — Extract & Split (DONE)
- [x] Create `src/lib/audit-types.ts` (shared types)
- [x] Create `src/lib/storybrand-scorer.ts` (scoring logic + HTML extraction)
- [x] Create `src/app/data/quiz-questions.ts` (questions, archetypes, trade options, checklist)
- [x] Extract components: `QuizScoreGauge.tsx`, `AuditCheck.tsx`, `StoryBrandItemRow.tsx`
- [x] Install cheerio, rewrite HTML parsing (replace regex)
- [x] Update imports in API route and quiz page

## Chunk 3: Bug Fixes (DONE)
- [x] LocalStorage hydration — move read into useEffect
- [x] Add Suspense boundary in quiz layout (required for useSearchParams)
- [x] ScoreGauge size bug — normal branch should be `text-sm` not `text-xs`
- [x] Formspree error handling — add error state, show warning on failure
- [x] Formspree flatten — replace nested objects with flat keys

## Chunk 4: UX Polish (DONE)
- [x] Hero copy — "8 quick questions" → "A few quick questions"
- [x] Trade skip — make skip button more visible
- [x] Loading indicator — show spinner during audit fetch in results view
- [x] ROI language — soften ("Potential Missed Revenue", add footnote)
- [x] Internal view protection — `?internal=SECRET` instead of `?internal=true`

## Chunk 5: Branch Reconciliation (DONE)
- [x] Other branches already cleaned up from remote
- [x] Merge `quiz-enhancements` into main (fast-forward)
- [x] Build verified on main

## Still TODO
- [x] Set `NEXT_PUBLIC_INTERNAL_KEY` in Vercel dashboard — value: `hw-internal-2026`
- [x] Push to GitHub and verify Vercel deployment
- [x] Delete remote branch `origin/claude/brainstorm-new-projects-eI6fG`
