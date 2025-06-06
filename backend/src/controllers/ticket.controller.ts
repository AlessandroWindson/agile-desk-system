import { Request } from 'express';
import { Response } from 'express';
import { supabase } from '../services/supabase.js';
import { Ticket, TicketCreateDTO, TicketUpdateDTO, TicketAssignDTO } from '../types/index.js';
import { AuthenticatedRequest } from '../types/index.js';

export class TicketController {
  async createTicket(req: AuthenticatedRequest, res: Response) {
    const { body } = req;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Usuário não autenticado'
      });
    }

    try {
      const { data, error } = await supabase
        .from('tickets')
        .insert({
          ...body,
          status: 'aberto',
          userId,
          data_abertura: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      // Emitir evento para WebSocket
      req.app?.get('io')?.emit('new-ticket', data);

      return res.status(201).json({
        success: true,
        data
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserTickets(req: AuthenticatedRequest, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Usuário não autenticado'
      });
    }

    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('userId', userId)
        .order('data_abertura', { ascending: false });

      if (error) throw error;

      return res.status(200).json({
        success: true,
        data
      });
    } catch (error) {
      throw error;
    }
  }

  async updateTicket(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Usuário não autenticado'
      });
    }

    try {
      // Verificar se o ticket pertence ao usuário
      const { data: ticketData, error: ticketError } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', id)
        .eq('userId', userId)
        .single();

      if (ticketError) throw ticketError;
      if (!ticketData) {
        return res.status(404).json({
          success: false,
          error: 'Ticket não encontrado'
        });
      }

      const { data, error } = await supabase
        .from('tickets')
        .update({
          ...body,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Emitir evento para WebSocket
      req.app?.get('io')?.emit('ticket-updated', data);

      return res.status(200).json({
        success: true,
        data
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllTickets(req: Request, res: Response) {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('data_abertura', { ascending: false });

      if (error) throw error;

      return res.status(200).json({
        success: true,
        data
      });
    } catch (error) {
      throw error;
    }
  }

  async assignTechnician(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    try {
      const { data, error } = await supabase
        .from('tickets')
        .update({
          ...body,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Emitir evento para WebSocket
      req.app?.get('io')?.emit('ticket-updated', data);

      return res.status(200).json({
        success: true,
        data
      });
    } catch (error) {
      throw error;
    }
  }
}
