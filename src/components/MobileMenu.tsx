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
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-foreground hover:text-accent transition-colors duration-300"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background menu-overlay-enter">
          {/* Close button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-foreground hover:text-accent transition-colors duration-300"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col justify-center items-start h-full px-8">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className="group flex items-baseline gap-4 py-4 border-b border-border/30 w-full"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <span className="text-xs text-muted-foreground font-mono tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-3xl font-serif text-foreground group-hover:text-accent transition-colors duration-300">
                  {item.label}
                </span>
              </Link>
            ))}

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="mt-8"
              >
                <Button variant="outline" className="text-xs tracking-widest border-accent/30">
                  ADMIN
                </Button>
              </Link>
            )}

            <div className="mt-auto pb-12 pt-8">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Paris / Berlin
              </p>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
