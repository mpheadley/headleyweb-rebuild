# Quiz Enhancement Fixes — Remaining Work

## Chunk 1: Security (DONE)
- [x] SSRF hardening — block private IPs, IPv6, cloud metadata
- [x] Rate limiting — 5 req/min per IP
- [x] GET → POST

## Chunk 2: Architecture — Extract & Split
- [ ] Create `src/lib/audit-types.ts` (shared types)
- [ ] Create `src/lib/storybrand-scorer.ts` (scoring logic + HTML extraction)
- [ ] Create `src/app/data/quiz-questions.ts` (questions, archetypes, trade options, checklist)
- [ ] Extract components: `QuizScoreGauge.tsx`, `AuditCheck.tsx`, `StoryBrandItemRow.tsx`
- [ ] Install cheerio, rewrite HTML parsing (replace regex)
- [ ] Update imports in API route and quiz page

## Chunk 3: Bug Fixes
- [ ] LocalStorage hydration — move read into useEffect
- [ ] Add Suspense boundary in quiz layout (required for useSearchParams)
- [ ] ScoreGauge size bug — normal branch should be `text-sm` not `text-xs`
- [ ] Formspree error handling — add error state, show warning on failure
- [ ] Formspree flatten — replace nested objects with flat keys

## Chunk 4: UX Polish
- [ ] Hero copy — "8 quick questions" → "A few quick questions"
- [ ] Trade skip — make skip button more visible
- [ ] Loading indicator — show spinner during audit fetch in results view
- [ ] ROI language — soften ("Potential Missed Revenue", add footnote)
- [ ] Internal view protection — `?internal=SECRET` instead of `?internal=true`

## Chunk 5: Branch Reconciliation
- [ ] Merge `brainstorm-project-ideas-DtX8d` (design tools) into main
- [ ] Merge `open-family-game-JuzHB` (memory game) into main
- [ ] Skip `setup-local-server-P0jcP` (font fix already on main)
- [ ] Merge `quiz-enhancements` into main after all fixes
- [ ] Delete remote branches
- [ ] Verify Vercel deployment
