# Beginner Build Plan (macOS)

## 1) Create GitHub repo
```bash
git init
# create a repo on GitHub first, then:
git remote add origin <YOUR_GITHUB_REPO_URL>
```

## 2) Run locally (no coding tools needed)
```bash
cd solarfarm
python3 -m http.server 3000
```
Open: http://localhost:3000

## 3) Supabase setup (for real backend)
1. Create Supabase project.
2. Run SQL in `docs/data-model.sql`.
3. Create Storage buckets: `documents`, `incidents`, `vehicle-checks`, `messages`, `reports`.
4. Enable Auth (email + password).
5. Add demo accounts with worker/team leader/supervisor roles.

## 4) Deploy hosted demo URL
Easy option: Cloudflare Pages or Netlify.
- Connect GitHub repo.
- Deploy root as static site.
- You get a URL instantly.

## 5) QR code deep links
Use links like:
- Timesheet by site: `https://your-url/timesheet?site_id=<id>`
- Vehicle check: `https://your-url/prestart?vehicle_id=<id>`
Generate QR codes via any free QR generator and print on signs/vehicles.

## 6) Basic admin setup
- Create sites
- Create vehicles
- Create teams + assign leader/workers
- Upload starter documents
- Create messaging groups
- Publish first team board
