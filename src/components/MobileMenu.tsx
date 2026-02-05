import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import cracraTypo from "@/assets/cracra-typo.jpg";

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
        <div className="fixed inset-0 z-[100] bg-background flex flex-col menu-overlay-enter">
          {/* Top bar — logo + close */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img
                src={cracraTypo}
                alt="CRACRAKREW"
                className="h-6 w-auto invert brightness-200"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-foreground hover:text-accent transition-colors duration-300"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 flex flex-col justify-center px-8">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className="group flex items-baseline gap-4 py-5 border-b border-border/20 w-full"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-[11px] text-muted-foreground tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-2xl text-foreground group-hover:text-accent transition-colors duration-300" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
                  {item.label}
                </span>
              </Link>
            ))}

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="mt-6"
              >
                <Button variant="outline" className="text-xs tracking-widest border-accent/30">
                  ADMIN
                </Button>
              </Link>
            )}
          </nav>

          {/* Footer */}
          <div className="px-8 pb-8">
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              Collectif artistique — Paris / Berlin
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
