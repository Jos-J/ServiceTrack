// server/src/index.ts

import 'dotenv/config';
import express from 'express';
import cors from "cors";
import metaRoute from "./routes/meta.route.js";
import serviceTypeRoute from './routes/serviceType.route.js';
import autosRoute from './routes/auto.route.js';
import maintenanceRoute from './routes/maintenance.route.js'
import partsRoute from './routes/parts.route.js';
import vehicleHistoryRoute from './routes/vehiclehistory.route.js';
import usersRoute from './routes/users.route.js';
// import techniciansRoute from './routes/technicians.route';
// import shopRoute from './routes/shop.route';
// import serviceLogRoute from './routes/serviceLog.route';
import healthRoute from './routes/health.route.js';
import authRoute from './routes/auth.route.js';



export * from "./types/api.js";
const app = express();


app.use((req, _res, next) => {
  console.log("REQ", req.method, req.originalUrl, "Origin:", req.headers.origin);
  next();
});

app.use(express.json());

const allowedOrigins = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow curl/Postman (no origin)
    if (!origin) return callback(null, true);

    // Allow listed origins
    if (allowedOrigins.includes(origin)) return callback(null, true);

    console.log("Blocked by CORS:", origin, "allowed:", allowedOrigins);

    // IMPORTANT: don't throw an Error (can turn into 500 on OPTIONS)
    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));



app.get("/api/version", (_req, res) => {
  res.json({ version: "v1-cors-check", time: Date.now() });
});


// ROUTES
app.use("/api/meta", metaRoute);
app.use('/api/autos', autosRoute);
app.use('/api/maintenance', maintenanceRoute);
app.use('/api/parts', partsRoute);
app.use('/api/vehicle-history', vehicleHistoryRoute);
app.use('/api/users', usersRoute);
// app.use('/api/technicians', techniciansRoute);
// app.use('/api/shops', shopRoute);
// app.use('/api/service-logs', serviceLogRoute);
app.use('/api/service-types', serviceTypeRoute)
app.use('/api/health', healthRoute);
app.use('/api/auth', authRoute);
console.log("AUTH ROUTES MOUNTED AT /api/auth")



app.use((err: any, _req: any, res: any, _next: any) => {
  console.error("UNHANDLED ERROR:", err);
  res.status(500).send("Internal Server Error");
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

