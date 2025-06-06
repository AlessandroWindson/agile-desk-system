import { Router } from 'express';
import { AgendamentoController } from '../controllers/agendamentoController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { AuthenticatedRequest } from '../types/index.js';
import { createAuthenticatedHandler } from '../types/middleware.js';
import { Request, Response, NextFunction } from 'express';

const router = Router();
const agendamentoController = new AgendamentoController();

router.post('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await agendamentoController.criarAgendamento(req as AuthenticatedRequest, res, next);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/status', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await agendamentoController.atualizarStatus(req as AuthenticatedRequest, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;
