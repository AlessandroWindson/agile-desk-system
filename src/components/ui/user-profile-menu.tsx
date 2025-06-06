
import { useState } from "react";
import { User, LogOut, Settings, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export const UserProfileMenu = () => {
  const { user, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao fazer logout. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const userInitials = user.user_metadata?.nome 
    ? user.user_metadata.nome.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : user.email?.charAt(0).toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-tech-blue/10">
          <Avatar className="h-10 w-10 border-2 border-tech-blue/20">
            <AvatarFallback className="bg-gradient-tech text-white font-semibold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-tech-navy/95 backdrop-blur-lg border-tech-blue/20 text-white" 
        align="end" 
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-tech-blue">
              {user.user_metadata?.nome || 'Usuário'}
            </p>
            <p className="text-xs leading-none text-tech-gray">
              {user.email}
            </p>
            {user.user_metadata?.empresa && (
              <p className="text-xs leading-none text-tech-purple">
                {user.user_metadata.empresa}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-tech-blue/20" />
        <DropdownMenuItem className="hover:bg-tech-blue/10 cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-tech-blue/10 cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-tech-blue/10 cursor-pointer">
          <Shield className="mr-2 h-4 w-4" />
          <span>Segurança</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-tech-blue/20" />
        <DropdownMenuItem 
          className="hover:bg-red-500/10 cursor-pointer text-red-400 hover:text-red-300"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoading ? "Saindo..." : "Sair"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
