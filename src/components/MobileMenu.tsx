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
        <div className="fixed inset-0 top-[72px] bg-background z-[9999] md:hidden">
          <nav className="flex flex-col items-center justify-start gap-12 pt-16 px-6 h-full overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-3xl font-black tracking-wide hover:opacity-60 transition-opacity"
                onClick={() => setIsOpen(false)}
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
            
            {isAdmin && (
              <Link to="/admin" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="text-lg font-bold px-8 py-6">
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
