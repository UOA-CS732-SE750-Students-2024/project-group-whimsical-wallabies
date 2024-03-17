import express from 'express';
import { authenticate } from './middlewares/authMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import { AUTH_PATHS } from './routes/paths.js';

const app = express();
app.use(express.json());
app.use(authenticate);
app.use(AUTH_PATHS.base, authRoutes);

export default app;
