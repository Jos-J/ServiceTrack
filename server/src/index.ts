// server/src/index.ts

import 'dotenv/config';
import express from 'express';
import cors from "cors";
import metaRoute from "./routes/meta.route.js";
import serviceTypeRoute  from './routes/serviceType.route.js';
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

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? [],
    credentials: true,
  })
);


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
app.use('/api/service-types', serviceTypeRoute)
app.use('/api/health', healthRoute);
app.use('/api/auth', authRoute);
console.log("AUTH ROUTES MOUNTED AT /api/auth")

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
