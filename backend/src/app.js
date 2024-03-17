import express from 'express';
// import { authenticate } from './middlewares/authMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import externalApiRoutes from './routes/externalApiRoutes.js';
import { AUTH_PATHS, THIRD_PARTY_APIS } from './routes/paths.js';

const app = express();
app.use(express.json());
// app.use(authenticate);
app.use(AUTH_PATHS.base, authRoutes);
app.use(THIRD_PARTY_APIS.base, externalApiRoutes);

export default app;
