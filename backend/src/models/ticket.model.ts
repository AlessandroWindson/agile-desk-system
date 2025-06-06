import { z } from 'zod';

export const TicketSchema = z.object({
  id: z.string(),
  titulo: z.string(),
  descricao: z.string(),
  status: z.enum(['aberto', 'em_andamento', 'resolvido', 'cancelado']),
  prioridade: z.enum(['baixa', 'media', 'alta', 'urgente']),
  categoria: z.string(),
  userId: z.string(),
  tecnicoId: z.string().nullable(),
  data_abertura: z.string().datetime(),
  data_fechamento: z.string().datetime().nullable(),
  observacoes: z.string().nullable(),
});

export type Ticket = z.infer<typeof TicketSchema>;

export const TicketUpdateSchema = TicketSchema.partial();
