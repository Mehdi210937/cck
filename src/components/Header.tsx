import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';
import cracraLogo from '@/assets/cracra-logo.jpg';

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
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center hover:opacity-70 transition-opacity"
        >
          <img 
            src={cracraLogo} 
            alt="CRACRA KREW Logo" 
            className="h-12 w-auto filter contrast-125"
          />
        </Link>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://instagram.com/cracrakrew" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover-invert p-2 rounded"
          >
            <Instagram size={20} />
          </a>
          
          {isAdmin && (
            <Link to="/admin">
              <Button variant="outline" className="text-xs">
                ADMIN
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;