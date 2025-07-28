import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setIsAdmin(session.user.email === 'cracrakrew@gmail.com');
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        setIsAdmin(session.user.email === 'cracrakrew@gmail.com');
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cracra-green bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link 
          to="/" 
          className="inline-block cracra-hover"
        >
          <h1 
            className="text-2xl md:text-4xl font-bold glitch-text text-cracra-yellow graffiti-shadow"
            data-text="CRACRAKREW"
          >
            CRACRAKREW
          </h1>
        </Link>
        
        {isAdmin && (
          <Link to="/admin">
            <Button variant="outline" className="border-cracra-pink text-cracra-pink hover:bg-cracra-pink hover:text-black">
              ADMIN 👑
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;