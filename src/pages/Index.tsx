
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Monitor, Shield, Clock, Users, Zap, ChevronRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Suporte TI Inteligente e Automatizado";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Dashboard Inteligente",
      description: "Monitore todos os chamados e agendamentos em tempo real com gráficos modernos"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Segurança Avançada",
      description: "Proteção de dados com criptografia e controle de acesso baseado em funções"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Agendamento Automático",
      description: "Sistema inteligente de agendamento com notificações e lembretes"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Gestão de Equipe",
      description: "Organize técnicos, distribua chamados e monitore performance"
    }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime Garantido" },
    { number: "< 2min", label: "Tempo Resposta" },
    { number: "24/7", label: "Suporte Contínuo" },
    { number: "500+", label: "Empresas Atendidas" }
  ];

  return (
    <div className="min-h-screen bg-gradient-dark overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-tech-blue/30 via-tech-purple/20 to-tech-pink/30 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tech-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tech-purple/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 glass-effect border-b border-white/10 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-tech rounded-2xl flex items-center justify-center animate-pulse-glow">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white font-orbitron">HelpDesk Pro</h1>
              <p className="text-xs text-tech-gray">Suporte Inteligente</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-tech-gray hover:text-tech-blue transition-colors">Início</Link>
            <Link to="/login" className="text-tech-gray hover:text-tech-blue transition-colors">Login</Link>
            <Link to="/register" className="text-tech-gray hover:text-tech-blue transition-colors">Cadastrar</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-tech-blue transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        <div className={`md:hidden absolute top-full left-0 right-0 glass-effect border-b border-white/10 transform transition-all duration-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
          <div className="container mx-auto px-6 py-4 space-y-4">
            <Link to="/" className="block text-tech-gray hover:text-tech-blue transition-colors">Início</Link>
            <Link to="/login" className="block text-tech-gray hover:text-tech-blue transition-colors">Login</Link>
            <Link to="/register" className="block text-tech-gray hover:text-tech-blue transition-colors">Cadastrar</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-orbitron">
            HelpDesk
            <span className="bg-gradient-tech bg-clip-text text-transparent"> Pro</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-tech-gray mb-8 h-8 font-inter">
            {typedText}
            <span className="animate-pulse">|</span>
          </div>
          
          <p className="text-lg text-tech-gray max-w-2xl mx-auto mb-12 leading-relaxed">
            Revolucione seu suporte técnico com nossa plataforma moderna de agendamento automatizado, 
            dashboards em tempo real e gestão inteligente de chamados.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="bg-gradient-tech hover:opacity-90 text-white border-0 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all shadow-2xl">
                Começar Agora
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border-tech-blue text-tech-blue hover:bg-tech-blue/10 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all">
                Fazer Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-effect border-white/10 p-6 text-center hover-glow hover:scale-105 transition-all">
              <div className="text-3xl font-bold text-white mb-2 font-orbitron">{stat.number}</div>
              <div className="text-tech-gray text-sm">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="glass-effect border-white/10 p-8 hover-glow hover:scale-105 transition-all group">
              <div className="w-16 h-16 bg-gradient-tech rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse">
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-orbitron">{feature.title}</h3>
              <p className="text-tech-gray leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="glass-effect border-white/10 p-12 text-center tech-glow">
          <div className="w-20 h-20 bg-gradient-tech rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 font-orbitron">Pronto para Revolucionar seu Suporte?</h2>
          <p className="text-tech-gray text-lg mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de empresas que já transformaram seu atendimento técnico com nossa plataforma.
          </p>
          <Link to="/register">
            <Button className="bg-gradient-tech hover:opacity-90 text-white border-0 px-12 py-4 text-xl font-semibold hover:scale-105 transition-all">
              Experimente Grátis
              <ChevronRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  );
};

export default Index;
