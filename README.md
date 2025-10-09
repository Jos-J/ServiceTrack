# 🚗 ServiceTrack

## 🌟 About ServiceTrack
Keep your vehicle’s full story at your fingertips. ServiceTrack is a full-stack application designed to help vehicle owners securely store VIN numbers, track maintenance history, log mysterious modifications, and monitor service intervals — even when records are incomplete. Designed for car owners, enthusiasts, and mechanics, ServiceTrack makes managing your vehicles simple, organized, and stress-free.

---

## 🧰 Features
- VIN Storage – Safely store and access multiple vehicle VINs.  
- Maintenance History – Log oil changes, tire rotations, repairs, and custom services.  
- Modification Tracker – Record unexplained or undocumented modifications.  
- Service Interval Reminders – Track or estimate service intervals even when official data is missing.  
- Search & Filter – Quickly find specific vehicles or history entries.  
- Cloud Sync (optional) – Access your vehicle records from any device.

---

## 💡 Use Cases
- Keep a digital record of all your vehicles.  
- Help mechanics or future buyers understand your car’s service history.  
- Track unknown modifications or aftermarket changes.  
- Maintain fleet or project car histories.

---

## 📁 ServiceTrack Folder Structure
```
ServiceTrack/
├── frontend/                  # Frontend files
│   ├── index.html             # Main HTML file
│   ├── css/                   # CSS folder
│   │   └── styles.css
│   └── js/                    # JavaScript folder
│       └── app.js
├── backend/                   # Backend files (Java Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/servicetrack/
│   │   │   │       ├── controllers/
│   │   │   │       ├── models/
│   │   │   │       └── services/
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── schema.sql
│   │   └── test/
│   │       └── java/
├── database/
│   └── mysql/
│       ├── schema.sql         # Database schema
│       └── seed.sql           # Sample data / seeds
├── README.md                  # Project documentation
└── .gitignore                 # Git ignore file
```
---
### 🧑‍💻 Contributing
Contributions are welcome! Share ideas, suggest features, or help improve ServiceTrack.  

---

### 📜 License

![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)


Copyright (c) 2025 Jos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
