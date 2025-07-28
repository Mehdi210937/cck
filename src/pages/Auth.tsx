import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import ParticleSystem from '@/components/ParticleSystem';
import SprayTag from '@/components/SprayTag';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Connexion réussie ! 🎉",
          description: "Bienvenue dans le KREW !",
        });
      } else {
        const redirectUrl = `${window.location.origin}/`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl
          }
        });
        if (error) throw error;
        toast({
          title: "Inscription réussie ! 📧",
          description: "Vérifie ton email pour confirmer ton compte !",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen graffiti-bg cracra-cursor">
      <ParticleSystem />
      <SprayTag />
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md border-cracra-green cracra-hover-intense spray-effect">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-cracra-pink graffiti-shadow">
              {isLogin ? 'CONNEXION' : 'REJOINDRE LE KREW'}
            </CardTitle>
            <CardDescription className="text-cracra-yellow">
              {isLogin ? 'Connecte-toi pour accéder au crew' : 'Inscris-toi pour devenir membre du CRACRA KREW'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Ton email cracra"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-cracra-green focus:border-cracra-pink"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Mot de passe underground"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-cracra-green focus:border-cracra-pink"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-cracra-green hover:bg-cracra-pink cracra-shake"
              >
                {loading ? '...' : (isLogin ? 'SE CONNECTER 🔥' : 'REJOINDRE LE KREW 💀')}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-cracra-yellow hover:text-cracra-pink underline"
              >
                {isLogin ? 'Pas encore membre ? Inscris-toi !' : 'Déjà membre ? Connecte-toi !'}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;