import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Ticket, Search, Plus, Filter, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Chamado {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  prioridade: string;
  status: string;
  created_at: string;
  usuario_id: string;
  tecnico_id: string | null;
  profiles?: {
    nome: string;
  };
}

const Tickets = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [busca, setBusca] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [novoTicket, setNovoTicket] = useState({
    titulo: '',
    descricao: '',
    categoria: '',
    prioridade: 'media'
  });

  const fetchChamados = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('chamados')
      .select(`
        *,
        profiles:usuario_id (nome)
      `)
      .eq('usuario_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar chamados:', error);
      return;
    }

    // Transformar dados para corresponder ao tipo Chamado
    const chamadosFormatados = data?.map(item => ({
      id: item.id,
      titulo: item.titulo,
      descricao: item.descricao,
      categoria: item.categoria,
      prioridade: item.prioridade,
      status: item.status,
      created_at: item.created_at,
      usuario_id: item.usuario_id,
      tecnico_id: item.tecnico_id,
      profiles: Array.isArray(item.profiles) ? item.profiles[0] : item.profiles
    })) || [];

    setChamados(chamadosFormatados);
  };

  useEffect(() => {
    fetchChamados();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase
      .from('chamados')
      .insert([{
        ...novoTicket,
        usuario_id: user.id
      }]);

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar chamado",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Sucesso",
      description: "Chamado criado com sucesso!"
    });

    setNovoTicket({ titulo: '', descricao: '', categoria: '', prioridade: 'media' });
    setMostrarForm(false);
    fetchChamados();
  };

  const chamadosFiltrados = chamados.filter(chamado => {
    const matchStatus = filtroStatus === 'todos' || chamado.status === filtroStatus;
    const matchCategoria = filtroCategoria === 'todas' || chamado.categoria === filtroCategoria;
    const matchBusca = chamado.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                      chamado.descricao.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchCategoria && matchBusca;
  });

  const stats = {
    total: chamados.length,
    abertos: chamados.filter(c => c.status === 'aberto').length,
    emAndamento: chamados.filter(c => c.status === 'em_andamento').length,
    fechados: chamados.filter(c => c.status === 'fechado').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aberto': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'em_andamento': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'fechado': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'media': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'baixa': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white font-orbitron mb-2">
              Chamados & Tickets
            </h1>
            <p className="text-tech-gray">Gerencie seus tickets de suporte técnico</p>
          </div>
          <Button 
            onClick={() => setMostrarForm(!mostrarForm)}
            className="bg-gradient-tech hover:opacity-90 text-white border-0 px-6 py-3"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Ticket
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-effect border-white/10 hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-tech-gray text-sm">Total</p>
                  <p className="text-3xl font-bold text-white">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-tech rounded-xl flex items-center justify-center">
                  <Ticket className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10 hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-tech-gray text-sm">Abertos</p>
                  <p className="text-3xl font-bold text-red-400">{stats.abertos}</p>
                </div>
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10 hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-tech-gray text-sm">Em Andamento</p>
                  <p className="text-3xl font-bold text-yellow-400">{stats.emAndamento}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10 hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-tech-gray text-sm">Fechados</p>
                  <p className="text-3xl font-bold text-green-400">{stats.fechados}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form para novo ticket */}
        {mostrarForm && (
          <Card className="glass-effect border-white/10 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-white font-orbitron">Criar Novo Ticket</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-tech-gray text-sm mb-2 block">Título</label>
                    <Input
                      value={novoTicket.titulo}
                      onChange={(e) => setNovoTicket({...novoTicket, titulo: e.target.value})}
                      className="bg-tech-navy/50 border-white/10 text-white"
                      placeholder="Título do chamado"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-tech-gray text-sm mb-2 block">Categoria</label>
                    <Select value={novoTicket.categoria} onValueChange={(value) => setNovoTicket({...novoTicket, categoria: value})}>
                      <SelectTrigger className="bg-tech-navy/50 border-white/10 text-white">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent className="bg-tech-navy border-white/10">
                        <SelectItem value="hardware">Hardware</SelectItem>
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="rede">Rede</SelectItem>
                        <SelectItem value="manutencao">Manutenção</SelectItem>
                        <SelectItem value="instalacao">Instalação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-tech-gray text-sm mb-2 block">Prioridade</label>
                  <Select value={novoTicket.prioridade} onValueChange={(value) => setNovoTicket({...novoTicket, prioridade: value})}>
                    <SelectTrigger className="bg-tech-navy/50 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-tech-navy border-white/10">
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-tech-gray text-sm mb-2 block">Descrição</label>
                  <Textarea
                    value={novoTicket.descricao}
                    onChange={(e) => setNovoTicket({...novoTicket, descricao: e.target.value})}
                    className="bg-tech-navy/50 border-white/10 text-white min-h-[100px]"
                    placeholder="Descreva o problema em detalhes..."
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="bg-gradient-tech hover:opacity-90 text-white border-0">
                    Criar Ticket
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setMostrarForm(false)} className="border-white/20 text-white hover:bg-white/10">
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filtros */}
        <Card className="glass-effect border-white/10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tech-gray w-4 h-4" />
                  <Input
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-10 bg-tech-navy/50 border-white/10 text-white"
                    placeholder="Buscar tickets..."
                  />
                </div>
              </div>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-full md:w-48 bg-tech-navy/50 border-white/10 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-tech-navy border-white/10">
                  <SelectItem value="todos">Todos Status</SelectItem>
                  <SelectItem value="aberto">Aberto</SelectItem>
                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                  <SelectItem value="fechado">Fechado</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger className="w-full md:w-48 bg-tech-navy/50 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-tech-navy border-white/10">
                  <SelectItem value="todas">Todas Categorias</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="rede">Rede</SelectItem>
                  <SelectItem value="manutencao">Manutenção</SelectItem>
                  <SelectItem value="instalacao">Instalação</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Tickets */}
        <div className="grid gap-6">
          {chamadosFiltrados.map((chamado) => (
            <Card key={chamado.id} className="glass-effect border-white/10 hover-glow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white font-orbitron">{chamado.titulo}</h3>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(chamado.status)}>
                          {chamado.status.replace('_', ' ')}
                        </Badge>
                        <Badge className={getPrioridadeColor(chamado.prioridade)}>
                          {chamado.prioridade}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-tech-gray mb-3">{chamado.descricao}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-tech-gray">
                      <span>Categoria: <span className="text-tech-blue">{chamado.categoria}</span></span>
                      <span>Criado em: <span className="text-tech-blue">{new Date(chamado.created_at).toLocaleDateString('pt-BR')}</span></span>
                      <span>ID: <span className="text-tech-blue">{chamado.id.slice(0, 8)}</span></span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {chamadosFiltrados.length === 0 && (
          <Card className="glass-effect border-white/10">
            <CardContent className="p-12 text-center">
              <Ticket className="w-16 h-16 text-tech-gray mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Nenhum ticket encontrado</h3>
              <p className="text-tech-gray">Tente ajustar os filtros ou criar um novo ticket</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Tickets;
