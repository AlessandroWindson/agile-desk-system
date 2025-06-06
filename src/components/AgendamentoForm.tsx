
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Mail, Phone, Wrench } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AgendamentoService, AgendamentoData } from "@/services/agendamentoService";

export const AgendamentoForm = () => {
  const [formData, setFormData] = useState<AgendamentoData>({
    nome: "",
    email: "",
    telefone: "",
    servico: "",
    dataAgendamento: "",
    descricao: "",
    prioridade: "media"
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const agendamento = await AgendamentoService.criarAgendamento(formData);
      
      toast({
        title: "Agendamento criado!",
        description: `Agendamento para ${agendamento.nome} foi solicitado. Você receberá um e-mail de confirmação.`,
      });

      // Limpar formulário
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        servico: "",
        dataAgendamento: "",
        descricao: "",
        prioridade: "media"
      });
    } catch (error: any) {
      console.error('Erro ao criar agendamento:', error);
      toast({
        title: "Erro",
        description: error.message || "Falha ao criar agendamento",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProcessarLote = async () => {
    setIsLoading(true);
    try {
      await AgendamentoService.processarAgendamentosLote();
      toast({
        title: "Processamento iniciado!",
        description: "Agendamentos de exemplo foram criados e e-mails serão enviados.",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Falha no processamento em lote",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-effect border-white/10 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-tech rounded-2xl mx-auto flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 font-orbitron">Novo Agendamento</h2>
          <p className="text-tech-gray">
            Agende seu atendimento técnico com nossa equipe especializada
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-white flex items-center">
                <User className="w-4 h-4 mr-2" />
                Nome Completo
              </Label>
              <Input
                id="nome"
                name="nome"
                type="text"
                value={formData.nome}
                onChange={handleInputChange}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-tech-gray focus:border-tech-blue"
                placeholder="Seu nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                E-mail
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-tech-gray focus:border-tech-blue"
                placeholder="seu@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone" className="text-white flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Telefone
              </Label>
              <Input
                id="telefone"
                name="telefone"
                type="tel"
                value={formData.telefone}
                onChange={handleInputChange}
                className="bg-white/5 border-white/10 text-white placeholder:text-tech-gray focus:border-tech-blue"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="servico" className="text-white flex items-center">
                <Wrench className="w-4 h-4 mr-2" />
                Serviço
              </Label>
              <Select value={formData.servico} onValueChange={(value) => handleSelectChange("servico", value)} required>
                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-tech-blue">
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="suporte-tecnico">Suporte Técnico</SelectItem>
                  <SelectItem value="instalacao-software">Instalação de Software</SelectItem>
                  <SelectItem value="manutencao-hardware">Manutenção de Hardware</SelectItem>
                  <SelectItem value="configuracao-rede">Configuração de Rede</SelectItem>
                  <SelectItem value="backup-dados">Backup de Dados</SelectItem>
                  <SelectItem value="consultoria">Consultoria TI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataAgendamento" className="text-white flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Data e Hora
              </Label>
              <Input
                id="dataAgendamento"
                name="dataAgendamento"
                type="datetime-local"
                value={formData.dataAgendamento}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().slice(0, 16)}
                className="bg-white/5 border-white/10 text-white focus:border-tech-blue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prioridade" className="text-white">
                Prioridade
              </Label>
              <Select value={formData.prioridade} onValueChange={(value) => handleSelectChange("prioridade", value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-tech-blue">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao" className="text-white">
              Descrição do Problema
            </Label>
            <Textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              rows={4}
              className="bg-white/5 border-white/10 text-white placeholder:text-tech-gray focus:border-tech-blue"
              placeholder="Descreva detalhadamente o problema ou serviço necessário..."
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-tech hover:opacity-90 text-white border-0 h-12 text-lg font-semibold hover:scale-105 transition-all"
            >
              {isLoading ? "Criando..." : "Solicitar Agendamento"}
            </Button>
            
            <Button
              type="button"
              onClick={handleProcessarLote}
              disabled={isLoading}
              variant="outline"
              className="border-tech-purple text-tech-purple hover:bg-tech-purple/10 h-12 px-6"
            >
              Processar Lote (Demo)
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
