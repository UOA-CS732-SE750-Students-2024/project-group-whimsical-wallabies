import cors from 'cors';
import express from 'express';
import { authenticate } from './middlewares/authMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import externalApiRoutes from './routes/externalApiRoutes.js';
import { AUTH_PATHS, THIRD_PARTY_APIS } from './routes/paths.js';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000' // Allow only the React app to make requests
  })
);
app.use(express.json());
app.use(authenticate);
app.use(AUTH_PATHS.base, authRoutes);
app.use(THIRD_PARTY_APIS.base, externalApiRoutes);

export default app;
