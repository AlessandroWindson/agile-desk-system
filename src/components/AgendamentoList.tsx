
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Mail, Wrench, CheckCircle, AlertCircle } from "lucide-react";
import { AgendamentoService, AgendamentoResponse } from "@/services/agendamentoService";
import { toast } from "@/hooks/use-toast";

export const AgendamentoList = () => {
  const [agendamentos, setAgendamentos] = useState<AgendamentoResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const carregarAgendamentos = async () => {
    try {
      const data = await AgendamentoService.listarAgendamentos();
      setAgendamentos(data);
    } catch (error: any) {
      console.error('Erro ao carregar agendamentos:', error);
      toast({
        title: "Erro",
        description: "Falha ao carregar agendamentos",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const atualizarStatus = async (id: string, novoStatus: string) => {
    try {
      await AgendamentoService.atualizarStatusAgendamento(id, novoStatus);
      await carregarAgendamentos(); // Recarregar lista
      
      toast({
        title: "Status atualizado!",
        description: `Agendamento marcado como ${novoStatus}`,
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Falha ao atualizar status",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'solicitado':
        return <Badge variant="outline" className="text-yellow-500 border-yellow-500">Solicitado</Badge>;
      case 'confirmado':
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Confirmado</Badge>;
      case 'atendido':
        return <Badge variant="outline" className="text-green-500 border-green-500">Atendido</Badge>;
      case 'cancelado':
        return <Badge variant="outline" className="text-red-500 border-red-500">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPrioridadeBadge = (prioridade: string) => {
    switch (prioridade) {
      case 'alta':
        return <Badge variant="destructive">Alta</Badge>;
      case 'media':
        return <Badge variant="secondary">Média</Badge>;
      case 'baixa':
        return <Badge variant="outline">Baixa</Badge>;
      default:
        return <Badge variant="outline">{prioridade}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="text-tech-blue">Carregando agendamentos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 font-orbitron">Lista de Agendamentos</h2>
        <p className="text-tech-gray">
          Gerencie todos os agendamentos do sistema
        </p>
      </div>

      {agendamentos.length === 0 ? (
        <Card className="glass-effect border-white/10 p-8 text-center">
          <Calendar className="w-16 h-16 text-tech-gray mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Nenhum agendamento encontrado</h3>
          <p className="text-tech-gray">Não há agendamentos cadastrados no momento.</p>
        </Card>
      ) : (
        <div className="grid gap-6">
          {agendamentos.map((agendamento) => (
            <Card key={agendamento.id} className="glass-effect border-white/10 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-tech-blue" />
                      <span className="text-white font-semibold text-lg">{agendamento.nome}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(agendamento.status)}
                      {getPrioridadeBadge(agendamento.prioridade)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-tech-gray">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{agendamento.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wrench className="w-4 h-4" />
                      <span>{agendamento.servico}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(agendamento.dataAgendamento).toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Criado em {new Date(agendamento.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  {agendamento.descricao && (
                    <div className="bg-white/5 rounded-lg p-3 mt-3">
                      <p className="text-tech-gray text-sm">{agendamento.descricao}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 min-w-[140px]">
                  {agendamento.status === 'solicitado' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => atualizarStatus(agendamento.id, 'confirmado')}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Confirmar
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => atualizarStatus(agendamento.id, 'atendido')}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Atender
                      </Button>
                    </>
                  )}
                  {agendamento.status === 'confirmado' && (
                    <Button
                      size="sm"
                      onClick={() => atualizarStatus(agendamento.id, 'atendido')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Atender
                    </Button>
                  )}
                  {agendamento.status !== 'cancelado' && agendamento.status !== 'atendido' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => atualizarStatus(agendamento.id, 'cancelado')}
                      className="border-red-500 text-red-500 hover:bg-red-500/10"
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
