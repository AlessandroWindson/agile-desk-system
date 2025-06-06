import { Request, Response, NextFunction } from 'express';
import { supabase } from '../services/supabase.js';
import { AuthenticatedRequest } from '../types/index.js';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        next({
          message: 'Erro ao fazer login',
          status: 400,
          details: error.message
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          user: data.user,
          session: data.session,
        },
      });
    } catch (error) {
      next({
        message: 'Erro ao fazer login',
        status: 500,
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password, nome, empresa } = req.body;

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome,
            empresa,
          },
        },
      });

      if (authError) {
        next({
          message: 'Erro ao registrar usuário',
          status: 400,
          details: authError.message
        });
        return;
      }

      res.status(201).json({
        success: true,
        data: {
          user: authData.user,
        },
      });
    } catch (error) {
      next({
        message: 'Erro ao registrar usuário',
        status: 500,
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  async getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    const { user } = req;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        next({
          message: 'Erro ao buscar perfil',
          status: 400,
          details: error.message
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          profile: data,
        },
      });
    } catch (error) {
      next({
        message: 'Erro ao buscar perfil',
        status: 500,
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
}
