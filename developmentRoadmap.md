
---

# ServiceTrack App - Development Checklist

## 1. Project Setup

* [x] Repo created (local + remote)
* [ ] `backend/` and `frontend/` folders with basic `package.json`
* [ ] Root README with project description & architecture
* [ ] Branching strategy noted (main/dev/feature)

## 2. Tooling & TypeScript

* [ ] TypeScript configs (`tsconfig.json`) in backend & frontend
* [ ] ESLint + Prettier configured
* [ ] Basic npm scripts: build, dev, lint, format
* [ ] Husky / lint-staged pre-commit hooks (optional)

## 3. Database Schema (MVP)

* [ ] Tables: Users, Vehicles, Maintenance, ServiceTypes, PartsInventory
* [ ] ER diagram or markdown table of models, keys, relations
* [ ] Unique constraints & foreign keys defined

## 4. Prisma Schema & DB Connection

* [ ] `prisma/schema.prisma` matches planned models
* [ ] Dev DB exists & connected via `.env`
* [ ] Seed data plan / script ready

## 5. API Skeleton & Contracts

* [ ] API endpoints defined (OpenAPI or markdown)
* [ ] Request/response shapes & status codes documented
* [ ] TypeScript interfaces created (`types/api.ts`)

## 6. Backend CRUD (Core MVP)

* [ ] Vehicles: Create / Read
* [ ] Maintenance records: Create / Read
* [ ] Prisma client types used (no `any`)
* [ ] Health-check endpoint implemented

## 7. Frontend Skeleton & Routing

* [ ] React TypeScript app running
* [ ] Routing & layout (Navbar)
* [ ] Page placeholders: Garage, Add VIN, VIN Detail, Login, Register
* [ ] Shared TypeScript types from backend

## 8. Frontend ↔ Backend Integration

* [ ] List vehicles in UI
* [ ] Add vehicle via UI
* [ ] View vehicle details with maintenance history
* [ ] Add maintenance entries

## 9. Authentication & Authorization

* [ ] Register / Login routes
* [ ] Protect create/edit endpoints
* [ ] Frontend login flow implemented
* [ ] Vehicles tied to user owner

## 10. Parts Inventory (Optional MVP Extension)

* [ ] CRUD for parts
* [ ] Link parts to maintenance entries

## 11. Tests & Validation

* [ ] Unit tests (backend logic)
* [ ] Integration tests (API endpoints)
* [ ] Frontend component/unit tests
* [ ] Server-side validation (Zod / io-ts / express-validator)
* [ ] CI runs test suite on PRs

## 12. Developer Experience

* [ ] Prisma Studio setup
* [ ] Postman / OpenAPI client ready
* [ ] Useful npm scripts documented
* [ ] Local dev README clear

## 13. Deployment & Backups

* [ ] Backend deployed (Railway / Render / Heroku)
* [ ] MySQL hosted (PlanetScale / AWS RDS)
* [ ] Frontend deployed (Vercel)
* [ ] CI/CD pipelines + DB migrations
* [ ] Backups configured

## 14. Iterate & Improve

* [ ] Notifications, search & filters
* [ ] Import/export (CSV)
* [ ] VIN decoding integration
* [ ] Reporting / analytics
* [ ] DB indices & query optimization

---

**MVP Goal (finish first)**

* [ ] User authentication
* [ ] Add/Edit/List vehicles (VIN unique)
* [ ] Add/List maintenance entries per vehicle
* [ ] Parts inventory CRUD (optional)
* [ ] Basic functional React UI

---


