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

  const navItems = [
    { path: "/shop", label: "Shop" },
    { path: "/artists", label: "Artists" },
    { path: "/releases", label: "Releases" },
    { path: "/archive", label: "Archive" },
    { path: "/imprint", label: "Imprint" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-3 hover:opacity-70 transition-opacity"
        >
          <img 
            src={cracraLogo} 
            alt="CRACRA KREW Logo" 
            className="h-12 w-auto filter contrast-125"
          />
          <span className="text-2xl font-black tracking-tight">CRACRAKREW</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-base font-black tracking-wide transition-opacity hover:opacity-60"
            >
              {item.label.toUpperCase()}
            </Link>
          ))}
          
          {isAdmin && (
            <Link to="/admin">
              <Button variant="outline" className="text-xs font-bold">
                ADMIN
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;