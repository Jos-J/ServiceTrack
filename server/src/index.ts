// server/src/index.ts
import 'dotenv/config';
import express from 'express';
import cors from "cors";

import autosRoute from './routes/auto.route.js';
import maintenanceRoute from './routes/maintenance.route.js'
import partsRoute from './routes/parts.route.js';
// import vehicleHistoryRoute from './routes/vehiclehistory.route';
// import usersRoute from './routes/users.route';
// import techniciansRoute from './routes/technicians.route';
// import shopRoute from './routes/shop.route';
// import serviceLogRoute from './routes/serviceLog.route';
import healthRoute from './routes/health.route.js';

export * from "./types/api.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.use(express.json());

// ROUTES
app.use('/api/autos', autosRoute);
app.use('/api/maintenance', maintenanceRoute);
app.use('/api/parts', partsRoute);
// app.use('/api/vehicle-history', vehicleHistoryRoute);
// app.use('/api/users', usersRoute);
// app.use('/api/technicians', techniciansRoute);
// app.use('/api/shops', shopRoute);
// app.use('/api/service-logs', serviceLogRoute);
app.use('/api/health', healthRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
