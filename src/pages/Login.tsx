
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Monitor, Eye, EyeOff, ArrowLeft, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, user, loading } = useAuth();

  useEffect(() => {
    // Redirecionar se já estiver logado
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        toast({
          title: "Erro no login",
          description: error.message || "E-mail ou senha incorretos",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Login realizado!",
        description: "Bem-vindo ao HelpDesk Pro",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error('Erro no login:', error);
      toast({
        title: "Erro",
        description: "Falha no login. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-tech-blue">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-tech-blue/20 to-tech-purple/20"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-tech-gray hover:text-tech-blue transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao início
        </Link>

        <Card className="glass-effect border-white/10 p-8 tech-glow">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-tech rounded-2xl mx-auto flex items-center justify-center mb-4 animate-pulse-glow">
              <Monitor className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 font-orbitron">Bem-vindo de volta</h1>
            <p className="text-tech-gray">
              Acesse sua conta do HelpDesk Pro
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                E-mail
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-tech-gray focus:border-tech-blue"
                placeholder="seu@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-tech-gray focus:border-tech-blue pr-10"
                  placeholder="Sua senha"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-tech-gray hover:text-tech-blue"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-tech hover:opacity-90 text-white border-0 h-12 text-lg font-semibold hover:scale-105 transition-all"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-tech-gray">
              Não tem uma conta?{" "}
              <Link to="/register" className="text-tech-blue hover:underline">
                Cadastre-se grátis
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
