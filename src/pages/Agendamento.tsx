
import { useState } from "react";
import { TechNavbar } from "@/components/ui/tech-navbar";
import { TechSidebarMenu } from "@/components/ui/tech-sidebar-menu";
import { AgendamentoForm } from "@/components/AgendamentoForm";
import { AgendamentoList } from "@/components/AgendamentoList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, List, Clock } from "lucide-react";

const Agendamento = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <section className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-tech-blue/10 border border-tech-blue/20 mb-8">
              <Clock className="w-4 h-4 text-tech-blue" />
              <span className="text-sm text-tech-blue font-mono">Sistema de Agendamento v2.0</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-orbitron">
              Agendamento
              <span className="bg-gradient-tech bg-clip-text text-transparent"> Inteligente</span>
            </h1>
            
            <p className="text-lg text-tech-gray max-w-2xl mx-auto mb-8 leading-relaxed">
              Sistema completo de agendamentos com notificações automáticas por e-mail, 
              integração DevOps e pipeline CI/CD.
            </p>
          </div>

          <Tabs defaultValue="novo" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-white/5 border border-white/10">
              <TabsTrigger 
                value="novo" 
                className="flex items-center space-x-2 data-[state=active]:bg-gradient-tech data-[state=active]:text-white"
              >
                <Calendar className="w-4 h-4" />
                <span>Novo Agendamento</span>
              </TabsTrigger>
              <TabsTrigger 
                value="lista" 
                className="flex items-center space-x-2 data-[state=active]:bg-gradient-tech data-[state=active]:text-white"
              >
                <List className="w-4 h-4" />
                <span>Lista de Agendamentos</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="novo">
              <AgendamentoForm />
            </TabsContent>

            <TabsContent value="lista">
              <AgendamentoList />
            </TabsContent>
          </Tabs>

          {/* DevOps Info Section */}
          <div className="mt-16 glass-effect p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 font-orbitron flex items-center">
              <Clock className="w-6 h-6 mr-2 text-tech-blue" />
              DevOps & Automação Implementada
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-tech-gray">
              <div>
                <h4 className="text-white font-semibold mb-2">✅ Pipeline CI/CD</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Jenkins configurado com Jenkinsfile</li>
                  <li>• Build e deploy automatizado</li>
                  <li>• Testes automatizados</li>
                  <li>• Deploy Kubernetes</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">✅ Notificações por E-mail</h4>
                <ul className="space-y-1 text-sm">
                  <li>• E-mail de confirmação de agendamento</li>
                  <li>• E-mail de atendimento concluído</li>
                  <li>• Templates HTML responsivos</li>
                  <li>• Integração com Resend/SMTP</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Agendamento;
