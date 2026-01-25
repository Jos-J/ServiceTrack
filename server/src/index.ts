// server/src/index.ts
/* process.on("uncaughtException", (err: any) => {
  console.error("UNCAUGHT EXCEPTION:", err);
  console.error("type:", typeof err);
  console.error("keys:", err && Object.keys(err));
  try { console.error("json:", JSON.stringify(err)); } catch {}
});

process.on("unhandledRejection", (reason: any) => {
  console.error("UNHANDLED REJECTION:", reason);
  console.error("type:", typeof reason);
  console.error("keys:", reason && Object.keys(reason));
  try { console.error("json:", JSON.stringify(reason)); } catch {}
}); 
*/

import 'dotenv/config';
import express from 'express';
import cors from "cors";
import metaRoute from "./routes/meta.route.js";

import autosRoute from './routes/auto.route.js';
import maintenanceRoute from './routes/maintenance.route.js'
import partsRoute from './routes/parts.route.js';
import vehicleHistoryRoute from './routes/vehicleHistory.route.js';
import usersRoute from './routes/users.route.js';
// import techniciansRoute from './routes/technicians.route';
// import shopRoute from './routes/shop.route';
// import serviceLogRoute from './routes/serviceLog.route';
import healthRoute from './routes/health.route.js';
import authRoute from './routes/auth.route.js';



export * from "./types/api.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.use(express.json());
app.use("/api/meta",metaRoute);

// ROUTES
app.use('/api/autos', autosRoute);
app.use('/api/maintenance', maintenanceRoute);
app.use('/api/parts', partsRoute);
app.use('/api/vehicle-history', vehicleHistoryRoute);
app.use('/api/users', usersRoute);
// app.use('/api/technicians', techniciansRoute);
// app.use('/api/shops', shopRoute);
// app.use('/api/service-logs', serviceLogRoute);
app.use('/api/health', healthRoute);
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
