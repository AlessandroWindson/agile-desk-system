
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Monitor, 
  Calendar, 
  Clock, 
  Users, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  User,
  Menu,
  X,
  Bell,
  Settings,
  LogOut,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

// Mock data
const lineData = [
  { name: 'Jan', tickets: 120, resolved: 110 },
  { name: 'Fev', tickets: 190, resolved: 180 },
  { name: 'Mar', tickets: 300, resolved: 280 },
  { name: 'Abr', tickets: 280, resolved: 270 },
  { name: 'Mai', tickets: 200, resolved: 195 },
  { name: 'Jun', tickets: 278, resolved: 260 },
];

const pieData = [
  { name: 'Resolvidos', value: 65, color: '#10b981' },
  { name: 'Em Andamento', value: 25, color: '#38bdf8' },
  { name: 'Pendentes', value: 10, color: '#f59e0b' }
];

const barData = [
  { name: 'João Silva', tickets: 45 },
  { name: 'Maria Santos', tickets: 38 },
  { name: 'Carlos Lima', tickets: 32 },
  { name: 'Ana Costa', tickets: 28 },
];

const recentTickets = [
  { id: 1, title: 'Problema de rede', user: 'João Silva', status: 'pending', time: '2 min atrás' },
  { id: 2, title: 'Instalação de software', user: 'Maria Santos', status: 'progress', time: '15 min atrás' },
  { id: 3, title: 'Backup de dados', user: 'Carlos Lima', status: 'resolved', time: '1h atrás' },
  { id: 4, title: 'Configuração de email', user: 'Ana Costa', status: 'pending', time: '2h atrás' },
];

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-tech-navy/95 backdrop-blur-md border-r border-white/10 z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-tech rounded-lg flex items-center justify-center">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">HelpDesk Pro</h1>
                <p className="text-xs text-tech-gray">Dashboard</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-white bg-white/10">
              <Monitor className="w-5 h-5 mr-3" />
              Dashboard
            </Button>
            <Link to="/schedule" className="block">
              <Button variant="ghost" className="w-full justify-start text-tech-gray hover:text-white hover:bg-white/10">
                <Calendar className="w-5 h-5 mr-3" />
                Agendamentos
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start text-tech-gray hover:text-white hover:bg-white/10">
              <Users className="w-5 h-5 mr-3" />
              Equipe
            </Button>
            <Button variant="ghost" className="w-full justify-start text-tech-gray hover:text-white hover:bg-white/10">
              <Settings className="w-5 h-5 mr-3" />
              Configurações
            </Button>
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="glass-effect p-4 rounded-lg border border-white/10">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-tech rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-tech-gray">admin@helpdesk.com</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full justify-start text-tech-gray hover:text-white">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-500';
      case 'progress': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
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

  return (
    <div className="min-h-screen bg-gradient-dark flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="glass-effect border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-tech-gray">Bem-vindo ao painel de controle</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white">
                <Bell className="w-5 h-5" />
              </Button>
              <Link to="/schedule">
                <Button className="bg-gradient-tech hover:opacity-90 text-white border-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Ticket
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-effect border-white/10 p-6 hover-glow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-tech-gray text-sm">Total de Tickets</p>
                  <p className="text-3xl font-bold text-white">1,234</p>
                  <p className="text-green-400 text-sm flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12% este mês
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-tech rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="glass-effect border-white/10 p-6 hover-glow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-tech-gray text-sm">Resolvidos</p>
                  <p className="text-3xl font-bold text-white">987</p>
                  <p className="text-green-400 text-sm flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    80% taxa resolução
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="glass-effect border-white/10 p-6 hover-glow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-tech-gray text-sm">Tempo Médio</p>
                  <p className="text-3xl font-bold text-white">2.4h</p>
                  <p className="text-blue-400 text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    -15min esta semana
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="glass-effect border-white/10 p-6 hover-glow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-tech-gray text-sm">Técnicos Ativos</p>
                  <p className="text-3xl font-bold text-white">24</p>
                  <p className="text-tech-purple text-sm flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    +2 novos técnicos
                  </p>
                </div>
                <div className="w-12 h-12 bg-tech-purple rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Line Chart */}
            <Card className="glass-effect border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Evolução de Tickets</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line type="monotone" dataKey="tickets" stroke="#38bdf8" strokeWidth={3} />
                  <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Pie Chart */}
            <Card className="glass-effect border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Status dos Tickets</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Bar Chart and Recent Tickets */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <Card className="glass-effect border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Tickets por Técnico</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="tickets" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Recent Tickets */}
            <Card className="glass-effect border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Tickets Recentes</h3>
              <div className="space-y-4">
                {recentTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-3 glass-effect rounded-lg border border-white/5">
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{ticket.title}</h4>
                      <p className="text-tech-gray text-sm">{ticket.user}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={`${getStatusColor(ticket.status)} text-white`}>
                        {getStatusText(ticket.status)}
                      </Badge>
                      <span className="text-tech-gray text-sm">{ticket.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
