import { z } from 'zod';

export const ChatMessageSchema = z.object({
  id: z.string(),
  ticketId: z.string(),
  userId: z.string(),
  mensagem: z.string(),
  tipo: z.enum(['usuario', 'tecnico']),
  lida: z.boolean(),
  created_at: z.string().datetime(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatMessageCreateSchema = ChatMessageSchema.omit({
  id: true,
  created_at: true,
});
