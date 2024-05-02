import cors from 'cors';
import express from 'express';
import { authenticate } from './middlewares/authMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import dogRoutes from './routes/dogRoutes.js';
import externalApiRoutes from './routes/externalApiRoutes.js';
import { AUTH_PATHS, DOG_PATHS, THIRD_PARTY_APIS } from './routes/paths.js';
import photoRoutes from './routes/photoRoutes.js';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000' // Allow only the React app to make requests
  })
);
app.use(express.json());
app.use(authenticate);
app.use(AUTH_PATHS.base, authRoutes);
app.use('/api/dog/:dogId/photos', photoRoutes);
app.use(DOG_PATHS.base, dogRoutes);
app.use(THIRD_PARTY_APIS.base, externalApiRoutes);

export default app;
