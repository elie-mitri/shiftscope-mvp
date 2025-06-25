# Product Requirements Document (PRD)

## Product: ShiftScope (placeholder name)

### Purpose
MVP of a web app for restaurant workers to review and browse workplace culture, management, and job conditions in NYC.

---

## 1. High-Level Context for AI
- **Audience:** Hourly restaurant workers (servers, line cooks, baristas, bartenders, etc.) in NYC
- **Goal:** Let users browse and post anonymous reviews of restaurant workplaces
- **Unique angle:** Localized (NYC-first), restaurant-specific, and focused on working conditions (e.g. tipping, schedules, burnout, etc.) — not generic company ratings
- **Differentiators:** Unlike Glassdoor or Reddit, this app is focused, searchable by restaurant name, and optimized for small, independent businesses often left out of other platforms

---

## 2. Core MVP Features (v0.1)

### User Authentication
- Email/password signup
- Anonymous display name by default (no public personal info)
- [Stretch]: Anonymous login or OAuth (e.g., Apple Sign-In)

### Restaurant Directory
- List of restaurant profiles
- Fields: Name, Address, Neighborhood, Cuisine Type, Number of Reviews, Avg. Rating

### Review Submission
- Authenticated users can post 1+ reviews per restaurant
- Fields:
  - Star ratings (1–5) on:
    - Management
    - Work-life balance
    - Tipping/fair pay
    - Scheduling/Flexibility
    - Overall experience
  - Free-text description
  - Date worked (optional)
  - Role (dropdown: Server, Line Cook, Dishwasher, Host, Bartender, etc.)

### Browse/Search Reviews
- Search bar (by name, borough, or cuisine)
- View restaurant profile with:
  - Aggregate ratings
  - Recent reviews
  - Report button on reviews

### Admin Tools
- Basic moderation panel:
  - View flagged reviews
  - Hide/delete reviews
  - Basic analytics [optional for MVP]

---

## 3. Technical Considerations

| Area          | Recommendation                                    |
|---------------|--------------------------------------------------|
| Frontend      | React or Next.js + TailwindCSS                   |
| Backend       | Node.js/Express or Django                        |
| Auth          | Firebase Auth or Supabase Auth                   |
| Database      | PostgreSQL (via Supabase, Railway, or similar)   |
| Hosting       | Vercel/Netlify (frontend) + Supabase/VPS backend|
| Search        | Keyword search now, full-text/Algolia later      |
| Moderation    | Keyword blacklist + manual moderation            |
| Security      | Hashed auth, rate limits, no sensitive data      |

---

## 4. Data Model (Simplified)

### Users
- id
- email
- anonymous_display_name
- role (optional)

### Restaurants
- id
- name
- address
- neighborhood
- cuisine
- created_at

### Reviews
- id
- restaurant_id
- user_id
- stars (object per category)
- text
- role
- created_at
- flagged (bool)

---

## 5. UX/UI Design Inspiration

### Sources
- Glassdoor: clean layout, category breakdown
- Reddit: anonymous avatar/comment threading
- Breakroom (UK): structured reviews and job scores
- Yelp: search/filter layout

### UX Principles
- Keep review flow frictionless
- Anonymous by default
- Mobile-first design
- Flag/report tools visible and intuitive
- Clean, legible typography and layout

---

## 6. Phase 2 / Future Features
- Verified worker badge (upload stub/photo)
- Job board or hiring section
- Discussion board
- Employer response feature
- Manager-level ratings
- Map-based search
- Top-rated filters and rankings

---

## 7. MVP Success Criteria
- Account creation + login
- Ability to post and browse reviews
- Working search
- Database of 25+ restaurants, 100+ seeded reviews
- Basic moderation tool

---

## 8. Monetization Ideas (for later)
- Freemium employer tools (profile claiming, featured review, etc.)
- Employer analytics SaaS (dashboard, benchmarking)
- Job listings (pay per post or featured jobs)
- In-app ads (non-disruptive, relevant only)
- Premium user features (alerts, filters)

---

## Notes for Claude
- Focus on fast iteration over perfect polish
- Modular architecture: separation of API, DB, and front-end
- Design for user safety (anonymity, anti-retaliation)
- Allow easy local dev + test database setup
- Help seed the database with sample NYC restaurants for testing

