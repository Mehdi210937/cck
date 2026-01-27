import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import cracraLogo from '@/assets/cracra-logo.jpg';
import MobileMenu from './MobileMenu';
import CracraLogo from './CracraLogo';

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async (userId: string) => {
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();
      setIsAdmin(!!data);
    };

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        checkAdminRole(session.user.id);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        checkAdminRole(session.user.id);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const navItems = [
    // { path: "/shop", label: "Shop" }, // Hidden for now
    { path: "/artists", label: "Artists" },
    { path: "/releases", label: "Releases" },
    { path: "/reco", label: "Reco" },
    { path: "/archive", label: "Archive" },
    { path: "/infos", label: "Infos" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm py-3 bg-background/80">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 md:gap-3 hover:opacity-70 transition-opacity"
        >
          <img 
            src={cracraLogo} 
            alt="CRACRA KREW Logo" 
            className="h-10 md:h-12 w-auto filter contrast-125 mix-blend-multiply dark:mix-blend-screen dark:invert"
          />
          <CracraLogo />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
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

        {/* Mobile Navigation */}
        <MobileMenu isAdmin={isAdmin} navItems={navItems} />
      </div>
    </header>
  );
};

export default Header;