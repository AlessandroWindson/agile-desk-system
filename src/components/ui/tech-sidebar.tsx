import {
  X,
  Sun,
  Moon,
  Monitor,
  Shield,
  Clock,
  Users,
  Settings,
  BookOpen,
  Code,
  Terminal
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";

interface TechSidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: <Monitor className="w-5 h-5" />,
    path: "/dashboard",
    shortcut: "/db"
  },
  {
    title: "Suporte",
    icon: <Shield className="w-5 h-5" />,
    path: "/suporte",
    shortcut: "/sp"
  },
  {
    title: "Agendamentos",
    icon: <Clock className="w-5 h-5" />,
    path: "/agendamentos",
    shortcut: "/ag"
  },
  {
    title: "Usuários",
    icon: <Users className="w-5 h-5" />,
    path: "/usuarios",
    shortcut: "/us"
  },
  {
    title: "Configurações",
    icon: <Settings className="w-5 h-5" />,
    path: "/configuracoes",
    shortcut: "/cfg"
  },
  {
    title: "Documentação",
    icon: <BookOpen className="w-5 h-5" />,
    path: "/docs",
    shortcut: "/doc"
  },
  {
    title: "API",
    icon: <Code className="w-5 h-5" />,
    path: "/api",
    shortcut: "/api"
  },
  {
    title: "Terminal",
    icon: <Terminal className="w-5 h-5" />,
    path: "/terminal",
    shortcut: "/ter"
  }
];

export const TechSidebar = ({ open, onClose }: TechSidebarProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-tech-dark/95 backdrop-blur-sm transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-tech-dark/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-tech-purple text-2xl font-orbitron">HD</span>
              <span className="text-tech-blue">Pro</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-tech-dark/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto">
          <div className="p-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="tech-menu-item flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-tech-dark/30 transition-colors"
              >
                {item.icon}
                <span className="flex-1 text-tech-gray hover:text-tech-blue transition-colors">
                  {item.title}
                </span>
                <span className="text-tech-purple text-xs font-mono">{item.shortcut}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-tech-dark/20">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-2 w-full px-4 py-3 rounded-lg hover:bg-tech-dark/30 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            <span className="text-tech-gray hover:text-tech-blue transition-colors">
              {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
            </span>
          </button>
          <div className="mt-4 text-center text-tech-gray text-sm">
            <p>© 2025 HelpDesk Pro</p>
            <p className="text-tech-gray/70">v1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TechSidebar;
