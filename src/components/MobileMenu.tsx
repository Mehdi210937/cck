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
        <div 
          className="fixed inset-0 top-[72px] bg-background z-[100] md:hidden animate-slide-in-right"
          style={{
            animation: isOpen ? 'slide-in-right 0.3s ease-out forwards' : 'slide-out-right 0.3s ease-out forwards'
          }}
        >
          <nav className="flex flex-col items-center justify-center h-full px-8 gap-2">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-5xl font-black tracking-tight transition-all duration-300 hover:scale-105 hover:opacity-60 relative group text-center"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: 'fade-in 0.4s ease-out forwards',
                  opacity: 0
                }}
                onClick={() => setIsOpen(false)}
              >
                {item.label.toUpperCase()}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-foreground transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            
            {isAdmin && (
              <Link 
                to="/admin" 
                onClick={() => setIsOpen(false)}
                className="mt-8"
                style={{ 
                  animationDelay: `${navItems.length * 50}ms`,
                  animation: 'fade-in 0.4s ease-out forwards',
                  opacity: 0
                }}
              >
                <Button variant="outline" className="text-sm font-bold px-6">
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
