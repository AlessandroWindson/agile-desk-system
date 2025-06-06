import { Request } from 'express';
import { Response } from 'express';
import { NextFunction } from 'express';
import { User } from '@supabase/supabase-js';

// Extensão do tipo Request do Express
interface ExtendedRequest extends Request {
  user?: User & {
    app_metadata: {
      role: string;
    };
  };
}

export interface AuthenticatedRequest extends ExtendedRequest {
  user: User & {
    app_metadata: {
      role: string;
    };
  };
}

export interface ApiError {
  message: string;
  status: number;
}

export enum UserRole {
  user = 'user',
  support = 'support',
  admin = 'admin'
}

// Tipos para Tickets
export interface Ticket {
  id: string;
  titulo: string;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta';
  status: 'aberto' | 'em_andamento' | 'resolvido' | 'fechado';
  usuario_id: string;
  tecnico_id?: string;
  data_criacao: string;
  data_atualizacao: string;
}

export interface TicketCreateDTO {
  titulo: string;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta';
}

export interface TicketUpdateDTO {
  titulo?: string;
  descricao?: string;
  prioridade?: 'baixa' | 'media' | 'alta';
  status?: 'aberto' | 'em_andamento' | 'resolvido' | 'fechado';
  tecnico_id?: string;
}

export interface TicketAssignDTO {
  tecnico_id: string;
}
