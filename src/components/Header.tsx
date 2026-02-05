import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import cracraLogo from '@/assets/cracra-logo.jpg';
import cracraTypo from '@/assets/cracra-typo.jpg';
import MobileMenu from './MobileMenu';

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
    <header className="sticky top-0 z-50 w-full backdrop-blur-md py-4 bg-background/90 border-b border-border/50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-70 transition-opacity duration-300"
        >
          <img
            src={cracraTypo}
            alt="CRACRAKREW"
            className="h-6 md:h-8 w-auto invert brightness-200"
          />
        </Link>

        {/* Desktop Navigation — numbered */}
        <nav className="hidden md:flex items-center gap-8 nav-numbered">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:text-accent link-reveal text-foreground/80 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}

          {isAdmin && (
            <Link to="/admin">
              <Button variant="outline" className="text-xs tracking-widest border-accent/30 hover:border-accent hover:bg-accent/10">
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
