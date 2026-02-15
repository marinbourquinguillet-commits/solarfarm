# Solar Farm Operations Hub (MVP)

A simple mobile-first Progressive Web App (PWA) starter for solar farm operations.

## What is included now
- Mobile-first dashboard UI with role-based actions.
- Core MVP module placeholders:
  - Timesheets
  - Vehicle pre-starts
  - Sites & maps
  - Documents hub
  - Incident reporting
  - Messaging groups
  - Team board
  - Production reports
- Complete SQL schema for Supabase/Postgres.
- Beginner-friendly build and deployment plan.
- Demo seed data and demo account list.

## Run locally on macOS
Copy/paste:
```bash
cd /path/to/solarfarm
python3 -m http.server 3000
```
Then open:
- http://localhost:3000

## Hosted demo
Deploy to Netlify or Cloudflare Pages from this repo for a public URL.

## Suggested Codex + GitHub workflow
1. Create one GitHub issue per milestone from `docs/milestones.md`.
2. Ask Codex to implement one issue at a time on a branch.
3. Review pull request.
4. Merge and deploy.

## Exact beginner milestone prompts for Codex
Use prompts like:
- "Implement Milestone 2 from docs/milestones.md with Supabase auth and role-based access."
- "Implement Timesheets CRUD with approval workflow and filters."

## Files to read first
- `docs/product-ux-plan.md`
- `docs/data-model.sql`
- `docs/build-plan.md`
- `docs/milestones.md`
