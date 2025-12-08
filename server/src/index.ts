import 'dotenv/config';
import express from 'express';
import autosRoute from './routes/auto.routes';
import maintenanceRoute from './routes/maintenance.routes';
import healthRoute from './routes/health.routes';

const app = express();
app.use(express.json());

// ROUTES
app.use('/api/autos', autosRoute);
app.use('/api/maintenance', maintenanceRoute);
app.use('/api/health', healthRoute);

// Existing example
// app.get('/users', ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);


