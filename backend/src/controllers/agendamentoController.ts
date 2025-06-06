import { Request, Response, NextFunction } from 'express';
import { EmailService } from '../services/emailService.js';
import { supabase } from '../config/supabase.js';
import z from 'zod';
import { AuthenticatedRequest } from '../types/index.js';

const agendamentoSchema = z.object({
  usuario_id: z.string(),
  chamado_id: z.string(),
  data_agendamento: z.string(),
  tipo_servico: z.string(),
  descricao: z.string(),
  tecnico_id: z.string(),
});

export class AgendamentoController {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async criarAgendamento(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = agendamentoSchema.parse(req.body);
      
      // Criar agendamento no Supabase
      const { data: agendamento, error: createError } = await supabase
        .from('agendamentos')
        .insert([data])
        .select()
        .single();

      if (createError) throw createError;

      // Buscar informações do usuário e técnico
      const { data: usuario } = await supabase
        .from('profiles')
        .select('nome, email')
        .eq('id', data.usuario_id)
        .single();

      const { data: tecnico } = await supabase
        .from('profiles')
        .select('nome')
        .eq('id', data.tecnico_id)
        .single();

      if (!usuario || !tecnico) {
        throw new Error('Usuário ou técnico não encontrado');
      }

      // Enviar e-mail de confirmação
      await this.emailService.sendEmail({
        to: usuario.email,
        subject: 'Confirmação de Agendamento - HelpDesk Pro',
        html: EmailService.createAgendamentoEmail(
          'agendamento',
          usuario.nome,
          data.data_agendamento,
          tecnico.nome
        ),
      });

      res.status(201).json({
        message: 'Agendamento criado com sucesso',
        agendamento,
      });
    } catch (error) {
      next({
        message: error instanceof Error ? error.message : 'Erro ao criar agendamento',
        status: 400
      });
    }
  }

  async atualizarStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Atualizar status no Supabase
      const { data: agendamento, error: updateError } = await supabase
        .from('agendamentos')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;

      // Buscar informações do usuário e técnico
      const { data: usuario } = await supabase
        .from('profiles')
        .select('nome, email')
        .eq('id', agendamento.usuario_id)
        .single();

      const { data: tecnico } = await supabase
        .from('profiles')
        .select('nome')
        .eq('id', agendamento.tecnico_id)
        .single();

      if (!usuario || !tecnico) {
        throw new Error('Usuário ou técnico não encontrado');
      }

      // Enviar e-mail de atualização
      await this.emailService.sendEmail({
        to: usuario.email,
        subject: 'Atualização de Atendimento - HelpDesk Pro',
        html: EmailService.createAtendimentoEmail(
          'atualizacao',
          usuario.nome,
          agendamento.data_agendamento,
          tecnico.nome,
          status
        ),
      });

      res.status(200).json({
        message: 'Status atualizado com sucesso',
        agendamento,
      });
    } catch (error) {
      next({
        message: error instanceof Error ? error.message : 'Erro ao atualizar status',
        status: 400
      });
    }
  }
}
