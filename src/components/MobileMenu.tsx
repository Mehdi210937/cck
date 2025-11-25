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
    <div className="md:hidden relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {isAdmin && (
              <Link 
                to="/admin" 
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 mt-2 border-t border-gray-200"
              >
                <Button variant="outline" className="w-full text-sm font-bold">
                  ADMIN
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};
