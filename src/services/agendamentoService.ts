
import { supabase } from "@/integrations/supabase/client";

export interface AgendamentoData {
  nome: string;
  email: string;
  telefone?: string;
  servico: string;
  dataAgendamento: string;
  descricao?: string;
  prioridade?: 'baixa' | 'media' | 'alta';
}

export interface AgendamentoResponse {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  servico: string;
  dataAgendamento: string;
  descricao?: string;
  prioridade: string;
  status: string;
  created_at: string;
}

export class AgendamentoService {
  static async criarAgendamento(data: AgendamentoData): Promise<AgendamentoResponse> {
    try {
      // Criar agendamento no banco
      const { data: agendamento, error } = await supabase
        .from('agendamentos')
        .insert({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          servico: data.servico,
          data_agendamento: data.dataAgendamento,
          descricao: data.descricao,
          prioridade: data.prioridade || 'media',
          status: 'solicitado'
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Erro ao criar agendamento: ${error.message}`);
      }

      // Enviar e-mail de confirmação
      await this.enviarEmailConfirmacao(agendamento);

      console.log(`Agendamento solicitado para ${data.nome}`);

      return {
        id: agendamento.id,
        nome: agendamento.nome,
        email: agendamento.email,
        telefone: agendamento.telefone,
        servico: agendamento.servico,
        dataAgendamento: agendamento.data_agendamento,
        descricao: agendamento.descricao,
        prioridade: agendamento.prioridade,
        status: agendamento.status,
        created_at: agendamento.created_at
      };
    } catch (error) {
      console.error('Erro no serviço de agendamento:', error);
      throw error;
    }
  }

  static async atualizarStatusAgendamento(id: string, status: string, tecnicoId?: string): Promise<void> {
    try {
      const { data: agendamento, error: updateError } = await supabase
        .from('agendamentos')
        .update({ 
          status,
          tecnico_id: tecnicoId,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        throw new Error(`Erro ao atualizar agendamento: ${updateError.message}`);
      }

      // Se o status for 'atendido', enviar e-mail de conclusão
      if (status === 'atendido') {
        await this.enviarEmailAtendimento(agendamento);
        console.log(`Agendamento atendido para ${agendamento.nome}`);
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      throw error;
    }
  }

  static async listarAgendamentos(): Promise<AgendamentoResponse[]> {
    try {
      const { data, error } = await supabase
        .from('agendamentos')
        .select('*')
        .order('data_agendamento', { ascending: true });

      if (error) {
        throw new Error(`Erro ao listar agendamentos: ${error.message}`);
      }

      return data.map(item => ({
        id: item.id,
        nome: item.nome,
        email: item.email,
        telefone: item.telefone,
        servico: item.servico,
        dataAgendamento: item.data_agendamento,
        descricao: item.descricao,
        prioridade: item.prioridade,
        status: item.status,
        created_at: item.created_at
      }));
    } catch (error) {
      console.error('Erro ao listar agendamentos:', error);
      throw error;
    }
  }

  private static async enviarEmailConfirmacao(agendamento: any): Promise<void> {
    try {
      const { error } = await supabase.functions.invoke('send-agendamento-email', {
        body: {
          to: agendamento.email,
          nome: agendamento.nome,
          tipo: 'confirmacao',
          dataAgendamento: agendamento.data_agendamento,
          servico: agendamento.servico
        }
      });

      if (error) {
        console.error('Erro ao enviar e-mail de confirmação:', error);
      }
    } catch (error) {
      console.error('Erro no envio de e-mail:', error);
    }
  }

  private static async enviarEmailAtendimento(agendamento: any): Promise<void> {
    try {
      // Buscar dados do técnico se disponível
      let tecnicoNome = 'Equipe Técnica';
      if (agendamento.tecnico_id) {
        const { data: tecnico } = await supabase
          .from('profiles')
          .select('nome')
          .eq('id', agendamento.tecnico_id)
          .single();
        
        if (tecnico) {
          tecnicoNome = tecnico.nome;
        }
      }

      const { error } = await supabase.functions.invoke('send-agendamento-email', {
        body: {
          to: agendamento.email,
          nome: agendamento.nome,
          tipo: 'atendido',
          dataAgendamento: agendamento.data_agendamento,
          servico: agendamento.servico,
          tecnico: tecnicoNome
        }
      });

      if (error) {
        console.error('Erro ao enviar e-mail de atendimento:', error);
      }
    } catch (error) {
      console.error('Erro no envio de e-mail:', error);
    }
  }

  // Método para processamento em lote (simulando a funcionalidade do documento)
  static async processarAgendamentosLote(): Promise<void> {
    const usuariosExemplo = [
      { nome: "Alice Silva", email: "alice@email.com", servico: "Suporte Técnico", dataAgendamento: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() },
      { nome: "Bruno Santos", email: "bruno@email.com", servico: "Instalação de Software", dataAgendamento: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() }
    ];

    console.log("Iniciando sistema de agendamento...");

    // Criar agendamentos
    for (const usuario of usuariosExemplo) {
      try {
        await this.criarAgendamento(usuario);
      } catch (error) {
        console.error(`Erro ao criar agendamento para ${usuario.nome}:`, error);
      }
    }

    // Simular atendimento após um tempo
    setTimeout(async () => {
      const agendamentos = await this.listarAgendamentos();
      for (const agendamento of agendamentos.filter(a => a.status === 'solicitado')) {
        try {
          await this.atualizarStatusAgendamento(agendamento.id, 'atendido');
        } catch (error) {
          console.error(`Erro ao atualizar agendamento ${agendamento.id}:`, error);
        }
      }
    }, 5000); // 5 segundos de delay para simular
  }
}
