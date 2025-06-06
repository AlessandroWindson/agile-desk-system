
import { useState } from 'react';
import { 
  Monitor, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Globe, 
  Shield,
  ChevronRight,
  Code,
  Database,
  Server,
  Smartphone,
  Headphones
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Sucesso!",
        description: "Obrigado por se inscrever em nossa newsletter!"
      });
      setEmail('');
    }
  };

  const services = [
    { icon: <Monitor className="w-5 h-5" />, name: "Suporte Técnico", desc: "24/7" },
    { icon: <Shield className="w-5 h-5" />, name: "Segurança Digital", desc: "Proteção Total" },
    { icon: <Database className="w-5 h-5" />, name: "Backup & Cloud", desc: "Dados Seguros" },
    { icon: <Server className="w-5 h-5" />, name: "Infraestrutura", desc: "Servidores" },
    { icon: <Smartphone className="w-5 h-5" />, name: "Mobile Support", desc: "Apps & Devices" },
    { icon: <Code className="w-5 h-5" />, name: "Desenvolvimento", desc: "Custom Solutions" }
  ];

  const quickLinks = [
    "Dashboard", "Agendamentos", "Chamados", "Relatórios", 
    "Configurações", "Perfil", "Ajuda", "Documentação"
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, name: "GitHub", url: "#" },
    { icon: <Linkedin className="w-5 h-5" />, name: "LinkedIn", url: "#" },
    { icon: <Twitter className="w-5 h-5" />, name: "Twitter", url: "#" },
    { icon: <Globe className="w-5 h-5" />, name: "Website", url: "#" }
  ];

  const techStack = [
    "React", "TypeScript", "Supabase", "Tailwind CSS", 
    "Node.js", "PostgreSQL", "Vite", "shadcn/ui"
  ];

  return (
    <footer className="relative bg-gradient-to-br from-tech-navy via-slate-900 to-tech-navy border-t border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-tech-blue/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tech-purple/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-tech-cyan/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-white/10 py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-white font-orbitron mb-2">
                  Fique por dentro das novidades
                </h3>
                <p className="text-tech-gray">
                  Receba atualizações sobre novas funcionalidades e dicas de tecnologia
                </p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-4 w-full lg:w-auto">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className="bg-white/10 border-white/20 text-white placeholder:text-tech-gray min-w-80"
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-gradient-tech hover:opacity-90 text-white border-0 px-8"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Inscrever
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-tech rounded-2xl flex items-center justify-center animate-pulse-glow">
                  <Monitor className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white font-orbitron">HelpDesk Pro</h2>
                  <p className="text-tech-cyan text-sm">Suporte Inteligente</p>
                </div>
              </div>
              
              <p className="text-tech-gray leading-relaxed">
                Plataforma moderna e inteligente para gestão completa de suporte técnico, 
                agendamentos e chamados. Tecnologia de ponta para empresas que valorizam eficiência.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-tech-gray">
                  <MapPin className="w-4 h-4 text-tech-blue" />
                  <span>São Paulo, SP - Brasil</span>
                </div>
                <div className="flex items-center space-x-3 text-tech-gray">
                  <Phone className="w-4 h-4 text-tech-blue" />
                  <span>+55 (11) 9999-9999</span>
                </div>
                <div className="flex items-center space-x-3 text-tech-gray">
                  <Mail className="w-4 h-4 text-tech-blue" />
                  <span>contato@helpdeskpro.com.br</span>
                </div>
                <div className="flex items-center space-x-3 text-tech-gray">
                  <Headphones className="w-4 h-4 text-tech-blue" />
                  <span>Suporte 24/7 Disponível</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white font-orbitron">Nossos Serviços</h3>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-tech/20 rounded-xl flex items-center justify-center group-hover:bg-gradient-tech/40 transition-all">
                      <div className="text-tech-blue group-hover:text-white transition-colors">
                        {service.icon}
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-medium group-hover:text-tech-cyan transition-colors">
                        {service.name}
                      </div>
                      <div className="text-tech-gray text-sm">{service.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white font-orbitron">Links Rápidos</h3>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center space-x-2 text-tech-gray hover:text-tech-cyan transition-colors group py-1"
                  >
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{link}</span>
                  </a>
                ))}
              </div>

              <div className="pt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Tecnologias</h4>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-tech/20 border border-tech-blue/30 rounded-full text-tech-blue text-xs font-medium hover:bg-gradient-tech/40 transition-all cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white font-orbitron">Siga-nos</h3>
              <div className="flex flex-col gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 hover:text-tech-cyan transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-tech/20 rounded-full flex items-center justify-center">
                      {link.icon}
                    </div>
                    <span className="text-tech-gray">{link.name}</span>
                  </a>
                ))}
              </div>

              <div className="pt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Tempo de Resposta</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-tech-gray">Tickets Resolvidos</span>
                    <span className="text-tech-purple font-bold">15k+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-tech-gray">Tempo Resposta</span>
                    <span className="text-tech-pink font-bold">&lt; 2min</span>
                  </div>
                </div>
                <a href="#" className="text-tech-gray hover:text-tech-cyan transition-colors">
                  Documentação
                </a>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-tech-gray">Sistema Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-tech-gray text-sm">
              &copy; {new Date().getFullYear()} HelpDesk Pro. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-tech-gray hover:text-tech-cyan transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-tech-gray hover:text-tech-cyan transition-colors">
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
