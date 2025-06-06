
import { useState, useEffect } from "react";
import { Menu, X, Terminal, Code, Zap, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { UserProfileMenu } from "./user-profile-menu";

interface TechNavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const TechNavbar = ({ onToggleSidebar, isSidebarOpen }: TechNavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-tech-navy/95 backdrop-blur-lg border-b border-tech-blue/20 shadow-lg shadow-tech-blue/10" 
          : "bg-tech-navy/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleSidebar}
              className={`p-2 rounded-lg transition-all duration-300 hover:bg-tech-blue/10 hover:scale-110 ${
                isSidebarOpen ? "text-tech-blue rotate-90" : "text-tech-gray hover:text-tech-blue"
              }`}
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-tech rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Terminal className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-tech-pink rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-orbitron font-bold bg-gradient-tech bg-clip-text text-transparent">
                  HelpDesk
                </span>
                <span className="text-tech-blue ml-1 font-orbitron">Pro</span>
              </div>
            </Link>
          </div>

          {/* Status Indicators */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-tech-blue/10 border border-tech-blue/20">
              <div className="w-2 h-2 bg-tech-blue rounded-full animate-pulse"></div>
              <span className="text-xs text-tech-blue font-mono">ONLINE</span>
            </div>
            
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-tech-purple/10 border border-tech-purple/20">
              <Code className="w-3 h-3 text-tech-purple" />
              <span className="text-xs text-tech-purple font-mono">v2.0.1</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {!loading && (
              <>
                {user ? (
                  <UserProfileMenu />
                ) : (
                  <>
                    <Link to="/login" className="hidden sm:block">
                      <Button variant="outline" size="sm" className="border-tech-blue/30 text-tech-blue hover:bg-tech-blue/10 hover:border-tech-blue/50 transition-all duration-300">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button size="sm" className="bg-gradient-tech hover:opacity-90 text-white border-0 hover:scale-105 transition-all duration-300 shadow-lg shadow-tech-blue/25">
                        <Zap className="w-4 h-4 mr-1" />
                        Start
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Tech Glow Effect */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-tech-blue to-transparent opacity-50"></div>
    </nav>
  );
};
