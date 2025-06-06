import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { Request, Response, NextFunction } from 'express';
import { AuthMiddleware, AuthenticatedRequestHandler, createAuthenticatedHandler } from '../types/middleware.js';
import { AuthenticatedRequest } from '../types/index.js';

const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/register', authController.register);

// Wrapper para middleware de autenticação
const authMiddlewareWrapper: AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return authMiddleware(req, res, next);
};

// Handler autenticado
const getProfileHandler: AuthenticatedRequestHandler = createAuthenticatedHandler(
  authController.getProfile
);

router.get('/me', authMiddlewareWrapper, getProfileHandler);

export default router;
