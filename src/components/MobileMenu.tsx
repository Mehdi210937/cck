import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

interface MobileMenuProps {
  isAdmin: boolean;
  navItems: Array<{ path: string; label: string }>;
}

const MobileMenu = ({ isAdmin, navItems }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden relative">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-background rounded-lg shadow-lg border border-border py-2 z-50 animate-fade-in">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-3 text-base font-bold text-foreground hover:bg-muted transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {isAdmin && (
              <Link to="/admin" onClick={() => setIsOpen(false)} className="px-4 py-3 mt-2 border-t border-border">
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

export default MobileMenu;
