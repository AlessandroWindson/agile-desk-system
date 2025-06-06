import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './index.js';

export type AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export type AuthenticatedRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

// Função para criar um handler autenticado
export function createAuthenticatedHandler(
  handler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void> | void
): AuthenticatedRequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return handler(req as AuthenticatedRequest, res, next);
    } catch (error) {
      next(error);
    }
  };
}
