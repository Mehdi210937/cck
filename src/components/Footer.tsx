import { Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-border/50 py-3 bg-background/95 backdrop-blur-md z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com/cracrakrew"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://youtube.com/@cracrakrewrecordings"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors duration-300"
              aria-label="YouTube"
            >
              <Youtube size={16} />
            </a>
          </div>

          <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            &copy; {new Date().getFullYear()} CRACRA KREW
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
