# ServiceTrack App - Development Checklist

## 1. Project Setup

* [X] Repo created (local + remote)
* [X] `backend/` and `frontend/` folders with basic `package.json`
* [X] Root README with project description & architecture
* [X] Branching strategy noted (main/dev/feature)

## 2. Tooling & TypeScript

* [X] TypeScript configs (`tsconfig.json`) in backend & frontend
* [X] ESLint + Prettier configured
* [X] Basic npm scripts: build, dev, lint, format
* [ ] Husky / lint-staged pre-commit hooks (optional)

## 3. Database Schema (MVP)

* [X] Tables: Users, Vehicles, Maintenance, ServiceTypes, PartsInventory
* [X] ER diagram or markdown table of models, keys, relations
* [X] Unique constraints & foreign keys defined

## 4. Prisma Schema & DB Connection

* [X] `prisma/schema.prisma` matches planned models
* [X] Dev DB exists & connected via `.env`
* [X] Seed data plan / script ready

## 5. API Skeleton & Contracts

* [ ] REST Endpoints Defined
  - Define routes such as `/api/vehicles`, `/api/maintenance`, and `/api/users`.
  - Specify supported methods (`GET`, `POST`, `PUT`, `DELETE`) for each route.

* [ ] Request and Response Contracts Documented
  - Define input and output shapes for each endpoint.
  - Include request bodies, query parameters, and response formats.

* [ ] TypeScript interfaces created (`types/api.ts`)
  - Create interfaces for all data models and payloads.


## 6. Backend CRUD (Core MVP with REST)

* [ ] Vehicles – Implement Routes & Controllers
  - Implement `GET /api/vehicles`, `GET /api/vehicles/:id`, and `POST /api/vehicles`.
  - Use Prisma client types for type safety (no any).

* [ ] Maintenance Records – Extend Controllers
  - Implement `GET /api/maintenance` and `POST /api/maintenance`.
  - Reuse Prisma types for strong TypeScript typing.

* [ ] Prisma Client Types Used (no any)
  - Use Prisma-generated types for full TypeScript safety.

* [ ] Health Check Endpoint
  - Implement a simple Express route to verify the server is running.



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
