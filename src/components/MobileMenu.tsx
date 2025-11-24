import { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

interface MobileMenuProps {
  isAdmin: boolean;
  navItems: Array<{ path: string; label: string }>;
}

const MobileMenu = ({ isAdmin, navItems }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 top-[72px] bg-background z-40 md:hidden animate-fade-in">
          <nav className="flex flex-col items-center gap-8 pt-12 px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-xl font-black tracking-wide transition-opacity hover:opacity-60"
                onClick={() => setIsOpen(false)}
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
            
            {isAdmin && (
              <Link to="/admin" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="text-sm font-bold">
                  ADMIN
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
