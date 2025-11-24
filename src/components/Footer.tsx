import { Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-border py-2 md:py-3 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6 md:gap-4">
            <a 
              href="https://instagram.com/cracrakrew" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover-invert p-2 rounded transition-all touch-target"
              aria-label="Instagram"
            >
              <Instagram size={20} className="md:w-[18px] md:h-[18px]" />
            </a>
            <a 
              href="https://facebook.com/cracrakrew" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover-invert p-2 rounded transition-all touch-target"
              aria-label="Facebook"
            >
              <Facebook size={20} className="md:w-[18px] md:h-[18px]" />
            </a>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} CRACRA KREW.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
