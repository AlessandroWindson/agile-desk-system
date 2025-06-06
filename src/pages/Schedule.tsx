
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Plus,
  Filter,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const existingTickets = [
  {
    id: 1,
    title: "Problema de conectividade",
    description: "Não consigo acessar a internet",
    date: "2024-06-10",
    time: "14:00",
    technician: "João Silva",
    priority: "high",
    status: "pending"
  },
  {
    id: 2,
    title: "Instalação de software",
    description: "Preciso instalar novo antivírus",
    date: "2024-06-11",
    time: "09:30",
    technician: "Maria Santos",
    priority: "medium",
    status: "progress"
  },
  {
    id: 3,
    title: "Backup de dados",
    description: "Configurar backup automático",
    date: "2024-06-09",
    time: "16:00",
    technician: "Carlos Lima",
    priority: "low",
    status: "resolved"
  }
];

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    time: "",
    priority: "",
    technician: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast({
        title: "Erro",
        description: "Selecione uma data para o agendamento",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simular envio do agendamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Agendamento criado!",
        description: "Seu ticket foi registrado com sucesso.",
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        time: "",
        priority: "",
        technician: ""
      });
      setSelectedDate(new Date());
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao criar agendamento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-500';
      case 'progress': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'Não definida';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'resolved': return 'Resolvido';
      case 'progress': return 'Em Andamento';
      case 'pending': return 'Pendente';
      default: return 'Desconhecido';
    }
  };

  const filteredTickets = existingTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="glass-effect border-b border-white/10 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="inline-flex items-center text-tech-gray hover:text-tech-blue transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Dashboard
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Agendamentos</h1>
                <p className="text-tech-gray">Gerencie seus tickets de suporte</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form Column */}
          <div className="lg:col-span-1">
            <Card className="glass-effect border-white/10 p-6 sticky top-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-tech rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Novo Agendamento</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">
                    Título do Problema
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-tech-gray focus:border-tech-blue"
                    placeholder="Ex: Problema de conectividade"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Descrição Detalhada
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                    rows={4}
                    className="bg-white/5 border-white/10 text-white placeholder:text-tech-gray focus:border-tech-blue resize-none"
                    placeholder="Descreva o problema em detalhes..."
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Data</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10",
                          !selectedDate && "text-tech-gray"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-tech-navy border-white/10" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-white">
                    Horário Preferido
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white focus:border-tech-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Prioridade</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent className="bg-tech-navy border-white/10">
                      <SelectItem value="low" className="text-white">Baixa</SelectItem>
                      <SelectItem value="medium" className="text-white">Média</SelectItem>
                      <SelectItem value="high" className="text-white">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Técnico Preferido (Opcional)</Label>
                  <Select value={formData.technician} onValueChange={(value) => handleInputChange('technician', value)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Selecione um técnico" />
                    </SelectTrigger>
                    <SelectContent className="bg-tech-navy border-white/10">
                      <SelectItem value="joao" className="text-white">João Silva</SelectItem>
                      <SelectItem value="maria" className="text-white">Maria Santos</SelectItem>
                      <SelectItem value="carlos" className="text-white">Carlos Lima</SelectItem>
                      <SelectItem value="ana" className="text-white">Ana Costa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-tech hover:opacity-90 text-white border-0 h-12 font-semibold hover:scale-105 transition-all"
                >
                  {isLoading ? "Criando..." : "Criar Agendamento"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Tickets List Column */}
          <div className="lg:col-span-2">
            <Card className="glass-effect border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Meus Agendamentos</h2>
                
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tech-gray w-4 h-4" />
                    <Input
                      placeholder="Buscar tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-tech-gray focus:border-tech-blue"
                    />
                  </div>
                  
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-tech-navy border-white/10">
                      <SelectItem value="all" className="text-white">Todos</SelectItem>
                      <SelectItem value="pending" className="text-white">Pendentes</SelectItem>
                      <SelectItem value="progress" className="text-white">Em Andamento</SelectItem>
                      <SelectItem value="resolved" className="text-white">Resolvidos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <Card key={ticket.id} className="glass-effect border-white/10 p-4 hover-glow hover:scale-105 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{ticket.title}</h3>
                          <Badge className={`${getPriorityColor(ticket.priority)} text-white`}>
                            {getPriorityText(ticket.priority)}
                          </Badge>
                          <Badge className={`${getStatusColor(ticket.status)} text-white`}>
                            {getStatusText(ticket.status)}
                          </Badge>
                        </div>
                        
                        <p className="text-tech-gray mb-3">{ticket.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-tech-gray">
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {format(new Date(ticket.date), "dd/MM/yyyy", { locale: ptBR })}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {ticket.time}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {ticket.technician}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {ticket.status === 'resolved' && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                        {ticket.status === 'pending' && (
                          <AlertCircle className="w-5 h-5 text-yellow-400" />
                        )}
                        {ticket.status === 'progress' && (
                          <Clock className="w-5 h-5 text-blue-400" />
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredTickets.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-tech-gray mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Nenhum ticket encontrado</h3>
                  <p className="text-tech-gray">
                    {searchTerm || filterStatus !== 'all' 
                      ? "Tente ajustar os filtros de busca" 
                      : "Você ainda não possui agendamentos"}
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
