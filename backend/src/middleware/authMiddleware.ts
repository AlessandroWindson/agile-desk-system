import { Request, Response, NextFunction } from 'express';
import { supabase } from '../services/supabase.js';
import { AuthenticatedRequest } from '../types/index.js';
import { User } from '@supabase/supabase-js';
import logger from '../config/logger.js';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.error('Token de autenticação não fornecido ou inválido');
      next({
        message: 'Token de autenticação não fornecido ou inválido',
        status: 401
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    
    // Verificar token diretamente
    const { data: { session }, error: authError } = await supabase.auth.getSession({
      token
    });

    if (authError) {
      logger.error(`Erro ao verificar token: ${authError.message}`);
      next({
        message: 'Erro ao verificar token',
        status: 401,
        details: authError.message
      });
      return;
    }

    if (!session || !session.user) {
      logger.error('Sessão ou usuário não encontrados');
      next({
        message: 'Sessão não encontrada',
        status: 401
      });
      return;
    }

    // Criar um novo objeto User com a estrutura esperada
    const userWithRole: User & { app_metadata: { role: string } } = {
      ...session.user,
      app_metadata: {
        ...session.user.app_metadata,
        role: session.user.app_metadata?.role || 'user'
      }
    };

    // Adicionar o usuário ao request
    (req as AuthenticatedRequest).user = userWithRole;
    logger.info(`Usuário autenticado: ${userWithRole.email}`);
    next();
  } catch (error) {
    logger.error(`Erro no middleware de autenticação: ${error instanceof Error ? error.message : String(error)}`);
    next({
      message: 'Erro no middleware de autenticação',
      status: 500,
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
