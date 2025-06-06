import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Navbar = ({ onToggleSidebar, isSidebarOpen }: NavbarProps) => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-tech-dark/90 backdrop-blur-sm" : "bg-tech-dark/50"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-tech-purple text-2xl font-orbitron">HD</span>
              <span className="text-tech-blue ml-2">Pro</span>
            </Link>
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg hover:bg-tech-dark/30 transition-colors"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard" className="tech-link flex items-center gap-2">
              <span className="text-tech-gray hover:text-tech-blue transition-colors">Dashboard</span>
              <span className="text-tech-purple text-xs font-mono">/db</span>
            </Link>
            <Link to="/suporte" className="tech-link flex items-center gap-2">
              <span className="text-tech-gray hover:text-tech-blue transition-colors">Suporte</span>
              <span className="text-tech-purple text-xs font-mono">/sp</span>
            </Link>
            <Link to="/agendamentos" className="tech-link flex items-center gap-2">
              <span className="text-tech-gray hover:text-tech-blue transition-colors">Agendamentos</span>
              <span className="text-tech-purple text-xs font-mono">/ag</span>
            </Link>
            <Link to="/usuarios" className="tech-link flex items-center gap-2">
              <span className="text-tech-gray hover:text-tech-blue transition-colors">Usuários</span>
              <span className="text-tech-purple text-xs font-mono">/us</span>
            </Link>
            <Link to="/configuracoes" className="tech-link flex items-center gap-2">
              <span className="text-tech-gray hover:text-tech-blue transition-colors">Configurações</span>
              <span className="text-tech-purple text-xs font-mono">/cfg</span>
            </Link>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-tech-dark/30 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
