import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/auth.routes.js';
import agendamentoRoutes from './routes/agendamentoRoutes.js';
import loggerMiddleware from './middleware/logger.js';
import logger from './config/logger.js';
import { Request, Response } from 'express';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/agendamento', agendamentoRoutes);

// Error handling
app.use(errorHandler);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Inicialização do servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
