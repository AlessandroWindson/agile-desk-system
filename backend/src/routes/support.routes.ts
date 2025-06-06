import express from 'express';
import { TicketController } from '../controllers/ticket.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { UserRole, AuthenticatedRequest } from '../types/index.js';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();
const ticketController = new TicketController();

// Rota para criar novo ticket (usuário)
router.post('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ticketController.createTicket(req as AuthenticatedRequest, res, next);
    return result;
  } catch (error) {
    next(error);
  }
});

// Rota para listar tickets do usuário
router.get('/me', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ticketController.getUserTickets(req as AuthenticatedRequest, res, next);
    return result;
  } catch (error) {
    next(error);
  }
});

// Rota para atualizar ticket (usuário)
router.put('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ticketController.updateTicket(req as AuthenticatedRequest, res, next);
    return result;
  } catch (error) {
    next(error);
  }
});

// Rota para listar todos os tickets (suporte)
router.get('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Verificar se é suporte ou admin
    const userRole = (req as AuthenticatedRequest).user?.app_metadata?.role;
    if (userRole !== UserRole.support && userRole !== UserRole.admin) {
      return res.status(403).json({
        success: false,
        error: 'Acesso não autorizado'
      });
    }
    
    const result = await ticketController.getAllTickets(req as AuthenticatedRequest, res, next);
    return result;
  } catch (error) {
    next(error);
  }
});

// Rota para atribuir técnico a ticket (suporte)
router.put('/:id/assign', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Verificar se é suporte ou admin
    const userRole = (req as AuthenticatedRequest).user?.app_metadata?.role;
    if (userRole !== UserRole.support && userRole !== UserRole.admin) {
      return res.status(403).json({
        success: false,
        error: 'Acesso não autorizado'
      });
    }
    
    const result = await ticketController.assignTechnician(req as AuthenticatedRequest, res, next);
    return result;
  } catch (error) {
    next(error);
  }
});

export default router;
