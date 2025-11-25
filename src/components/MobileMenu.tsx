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
        <div className="fixed inset-0 top-[72px] bg-white z-[100] md:hidden animate-fade-in shadow-lg border-t border-black overflow-y-auto scrollbar-custom">
          <nav className="flex flex-col items-center gap-8 pt-10 px-6 pb-10 text-black">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-2xl font-black tracking-wide transition-opacity hover:opacity-60 text-black"
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
