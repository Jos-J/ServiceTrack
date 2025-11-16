# 🚗 ServiceTrack

### ServiceTrack
Service Track is a comprehensive vehicle management app designed to keep all your vehicle information organized and accessible. Whether you’re tracking personal cars, project builds, or an entire fleet, Service Track ensures that every VIN, service entry, and modification is safely stored and easy to find.

![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue)](https://www.postgresql.org/) 
---
###  Table of Contents

- [Features](#features)  
- [Use Cases](#use-cases)
- [Project Roadmap](./docs/notes/developmentRoadmap.md)
- [Rest Endpoints ](./docs/notes/api.md)
- [Folder Structue](#folder-structure)
- [App Architecture](./docs/images/Fullstack-arch.png)
- [Table Diagram](./docs/images/visual%20diagram%20of%20tables.png)
- [Contact Us](#contact-us)
---

###  Features

- VIN Storage – Safely store and access multiple vehicle VINs.
- Maintenance History – Log oil changes, tire rotations, repairs, and custom services.
- Modification Tracker – Record unexplained or undocumented modifications.
- Service Interval Reminders – Track or estimate service intervals even when official data is missing.
- Search & Filter – Quickly find specific vehicles or history entries.
- Cloud Sync (optional) – Access your vehicle records from any device.

---

### Use Cases

- Keep a digital record of all your vehicles.
- Help mechanics or future buyers understand your car’s service history.
- Track unknown modifications or aftermarket changes.
- Maintain fleet or project car histories.

---

### Folder Structure

```
ServiceTrack/
├── .gitignore
├── README.md
├── server/
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── prisma/
│   │   └── middlewares/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── tsconfig.json
│   ├── package.json
│   └── .env
└── client/
    ├── src/
    │   ├── assets/          # images, icons, etc.
    │   │   ├── logo.png
    │   │   └── background.jpg
    │   ├── components/
    │   │   ├── Button.tsx
    │   │   ├── VinCard.tsx
    │   │   └── Navbar.tsx
    │   ├── pages/
    │   │   ├── LoginPage.tsx
    │   │   ├── RegisterPage.tsx
    │   │   ├── GaragePage.tsx
    │   │   ├── AddVinPage.tsx
    │   │   └── VinDetailPage.tsx
    │   ├── hooks/
    │   │   └── useAuth.ts
    │   ├── App.tsx
    │   └── main.tsx
    ├── tsconfig.json
    ├── package.json
    └── .env
```
---

### Contact us

Have suggestions or feedback, let us know. Feel free to reach out:

- Email: [Support@email.com ](malto:email@example.com)
- Phone: [123456789](tel:123456789)

Your feedback is appreciated, thank you for helping us improve.

