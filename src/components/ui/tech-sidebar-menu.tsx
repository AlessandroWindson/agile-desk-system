
import {
  X,
  Monitor,
  Shield,
  Clock,
  Users,
  Settings,
  BookOpen,
  Code,
  Terminal,
  Home,
  LogIn,
  UserPlus,
  Zap,
  ChevronRight,
  Cpu,
  Database
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface TechSidebarMenuProps {
  open: boolean;
  onClose: () => void;
}

const menuSections = [
  {
    title: "Navigation",
    items: [
      {
        title: "Home",
        icon: <Home className="w-5 h-5" />,
        path: "/",
        shortcut: "⌘H",
        description: "Página inicial"
      },
      {
        title: "Dashboard",
        icon: <Monitor className="w-5 h-5" />,
        path: "/dashboard",
        shortcut: "⌘D",
        description: "Painel de controle"
      }
    ]
  },
  {
    title: "Workspace",
    items: [
      {
        title: "Suporte",
        icon: <Shield className="w-5 h-5" />,
        path: "/tickets",
        shortcut: "⌘S",
        description: "Gerenciar tickets"
      },
      {
        title: "Agendamentos",
        icon: <Clock className="w-5 h-5" />,
        path: "/schedule",
        shortcut: "⌘A",
        description: "Agenda de serviços"
      },
      {
        title: "Usuários",
        icon: <Users className="w-5 h-5" />,
        path: "/usuarios",
        shortcut: "⌘U",
        description: "Gestão de usuários"
      }
    ]
  },
  {
    title: "System",
    items: [
      {
        title: "Configurações",
        icon: <Settings className="w-5 h-5" />,
        path: "/configuracoes",
        shortcut: "⌘,",
        description: "Configurações do sistema"
      },
      {
        title: "Documentação",
        icon: <BookOpen className="w-5 h-5" />,
        path: "/docs",
        shortcut: "⌘?",
        description: "Documentação técnica"
      },
      {
        title: "API",
        icon: <Code className="w-5 h-5" />,
        path: "/api",
        shortcut: "⌘K",
        description: "Interface de API"
      },
      {
        title: "Terminal",
        icon: <Terminal className="w-5 h-5" />,
        path: "/terminal",
        shortcut: "⌘T",
        description: "Terminal de comandos"
      }
    ]
  },
  {
    title: "Auth",
    items: [
      {
        title: "Login",
        icon: <LogIn className="w-5 h-5" />,
        path: "/login",
        shortcut: "⌘L",
        description: "Fazer login"
      },
      {
        title: "Registro",
        icon: <UserPlus className="w-5 h-5" />,
        path: "/register",
        shortcut: "⌘R",
        description: "Criar conta"
      }
    ]
  }
];

export const TechSidebarMenu = ({ open, onClose }: TechSidebarMenuProps) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-tech-navy/98 backdrop-blur-xl border-r border-tech-blue/20 transform transition-transform duration-300 ease-in-out shadow-2xl shadow-tech-blue/10 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-tech-blue/20 bg-gradient-to-r from-tech-navy to-tech-navy/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-tech rounded-lg flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-orbitron font-bold bg-gradient-tech bg-clip-text text-transparent">
                    HelpDesk
                  </span>
                  <span className="text-tech-blue ml-1 font-orbitron">Pro</span>
                  <div className="text-xs text-tech-gray font-mono">v2.0.1</div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-tech-blue/10 transition-colors group"
              >
                <X className="w-5 h-5 text-tech-gray group-hover:text-tech-blue transition-colors" />
              </button>
            </div>
          </div>

          {/* Menu */}
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
            {menuSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-4 h-px bg-gradient-to-r from-tech-blue to-tech-purple"></div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-tech-gray/80">
                    {section.title}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-tech-purple/20 to-transparent"></div>
                </div>
                
                <div className="space-y-1">
                  {section.items.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={index}
                        to={item.path}
                        onClick={onClose}
                        className={`group flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-tech-blue/10 hover:translate-x-1 ${
                          isActive
                            ? "bg-gradient-to-r from-tech-blue/20 to-tech-purple/10 border-l-2 border-tech-blue text-tech-blue"
                            : "text-tech-gray hover:text-tech-blue"
                        }`}
                      >
                        <div className={`${isActive ? "text-tech-blue" : "group-hover:text-tech-blue"} transition-colors`}>
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium truncate">{item.title}</span>
                            <span className="text-xs font-mono text-tech-purple/70 group-hover:text-tech-purple transition-colors">
                              {item.shortcut}
                            </span>
                          </div>
                          <div className="text-xs text-tech-gray/60 group-hover:text-tech-gray/80 transition-colors">
                            {item.description}
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                          isActive ? "opacity-100 text-tech-blue" : "text-tech-gray"
                        }`} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-tech-blue/20 bg-gradient-to-r from-tech-navy to-tech-navy/80">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center space-x-2 px-3 py-2 rounded-full bg-tech-blue/10 border border-tech-blue/20">
                <Cpu className="w-4 h-4 text-tech-blue" />
                <span className="text-xs text-tech-blue font-mono">System Online</span>
                <div className="w-2 h-2 bg-tech-blue rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-tech-gray/60">
              <div className="flex items-center space-x-2">
                <Database className="w-3 h-3" />
                <span className="font-mono">DB: Connected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-3 h-3" />
                <span className="font-mono">99.9% Uptime</span>
              </div>
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-tech-gray/50">© 2025 HelpDesk Pro</p>
              <p className="text-xs text-tech-gray/40 font-mono">Built with ❤️ & AI</p>
            </div>
          </div>
        </div>
        
        {/* Side Glow Effect */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-tech-blue/50 via-tech-purple/30 to-tech-blue/50"></div>
      </div>
    </>
  );
};
