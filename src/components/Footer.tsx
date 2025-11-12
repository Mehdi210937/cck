import { Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-border py-3 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <a 
              href="https://instagram.com/cracrakrew" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover-invert p-1 rounded transition-all"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://facebook.com/cracrakrew" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover-invert p-1 rounded transition-all"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>
          
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CRACRA KREW. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
