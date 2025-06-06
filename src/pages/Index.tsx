
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Zap, Shield, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { TechNavbar } from "@/components/ui/tech-navbar";
import { TechSidebarMenu } from "@/components/ui/tech-sidebar-menu";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-tech-blue" />,
      title: "Suporte Avançado",
      description: "Sistema completo de tickets e atendimento"
    },
    {
      icon: <Clock className="w-8 h-8 text-tech-purple" />,
      title: "Agendamento Inteligente",
      description: "Gestão automatizada de horários e recursos"
    },
    {
      icon: <Users className="w-8 h-8 text-tech-pink" />,
      title: "Gestão de Usuários",
      description: "Controle total de permissões e acessos"
    }
  ];

  return (
    <div className="min-h-screen bg-tech-navy">
      <TechNavbar 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
      />
      <TechSidebarMenu 
        open={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-tech-blue/10 border border-tech-blue/20 mb-8">
              <Zap className="w-4 h-4 text-tech-blue" />
              <span className="text-sm text-tech-blue font-mono">Powered by AI Technology</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-orbitron">
              HelpDesk
              <span className="bg-gradient-tech bg-clip-text text-transparent"> Pro</span>
            </h1>
            
            <p className="text-lg text-tech-gray max-w-2xl mx-auto mb-12 leading-relaxed">
              Revolucione seu suporte técnico com nossa plataforma moderna de agendamento automatizado, 
              dashboards em tempo real e gestão inteligente de chamados.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="bg-gradient-tech hover:opacity-90 text-white border-0 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all shadow-2xl group">
                  <Zap className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Começar Agora
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-tech-blue text-tech-blue hover:bg-tech-blue/10 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all">
                  Fazer Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-effect p-8 rounded-2xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-tech-navy to-tech-blue/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 font-orbitron">
                  {feature.title}
                </h3>
                <p className="text-tech-gray leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Tech Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { value: "99.9%", label: "Uptime" },
              { value: "24/7", label: "Support" },
              { value: "1000+", label: "Users" },
              { value: "50ms", label: "Response" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 glass-effect rounded-xl">
                <div className="text-3xl font-bold bg-gradient-tech bg-clip-text text-transparent font-orbitron">
                  {stat.value}
                </div>
                <div className="text-tech-gray text-sm font-mono mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
