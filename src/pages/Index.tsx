import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { useTheme } from "next-themes";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();



  return (
    <div className="min-h-screen bg-tech-dark">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />

      <div className="container mx-auto px-4 pt-20">
        <div className="relative w-full max-w-md">
          <section className="relative z-10 container mx-auto px-6 py-20">
            <div className="text-center mb-16">
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
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
