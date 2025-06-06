
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Monitor, Eye, EyeOff, ArrowLeft, User, Mail, Lock, Building } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Register = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    empresa: "",
    telefone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp, user, loading } = useAuth();

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
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(formData.email, formData.password, {
        nome: formData.nome,
        empresa: formData.empresa,
        telefone: formData.telefone
      });

      if (error) {
        toast({
          title: "Erro no registro",
          description: error.message || "Falha ao criar conta",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Sucesso!",
        description: "Conta criada com sucesso! Verifique seu e-mail para confirmar.",
      });
      
      navigate("/login");
    } catch (error: any) {
      console.error('Erro no registro:', error);
      toast({
        title: "Erro",
        description: "Falha ao criar conta. Tente novamente.",
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
            <div className="w-16 h-16 bg-gradient-tech rounded-2xl mx-auto flex items-center justify-center mb-4">
              <Monitor className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 font-orbitron">Criar Conta</h1>
            <p className="text-tech-gray">
              Junte-se ao HelpDesk Pro e revolucione seu suporte técnico
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-white flex items-center">
                <User className="w-4 h-4 mr-2" />
                Nome Completo
              </Label>
              <Input
                id="nome"
                name="nome"
                type="text"
                value={formData.nome}
                onChange={handleInputChange}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-tech-gray focus:border-tech-blue"
                placeholder="Seu nome completo"
              />
            </div>

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
              <Label htmlFor="empresa" className="text-white flex items-center">
                <Building className="w-4 h-4 mr-2" />
                Empresa
              </Label>
              <Input
                id="empresa"
                name="empresa"
                type="text"
                value={formData.empresa}
                onChange={handleInputChange}
                className="bg-white/5 border-white/10 text-white placeholder:text-tech-gray focus:border-tech-blue"
                placeholder="Nome da sua empresa"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone" className="text-white flex items-center">
                <User className="w-4 h-4 mr-2" />
                Telefone
              </Label>
              <Input
                id="telefone"
                name="telefone"
                type="tel"
                value={formData.telefone}
                onChange={handleInputChange}
                className="bg-white/5 border-white/10 text-white placeholder:text-tech-gray focus:border-tech-blue"
                placeholder="(00) 00000-0000"
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
                  placeholder="Mínimo 6 caracteres"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Confirmar Senha
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-tech-gray focus:border-tech-blue pr-10"
                  placeholder="Confirme sua senha"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-tech-gray hover:text-tech-blue"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-tech hover:opacity-90 text-white border-0 h-12 text-lg font-semibold hover:scale-105 transition-all"
            >
              {isLoading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-tech-gray">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-tech-blue hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
