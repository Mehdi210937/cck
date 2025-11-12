import { Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border py-8 mt-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <a 
              href="https://instagram.com/cracrakrew" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover-invert p-2 rounded transition-all"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://facebook.com/cracrakrew" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover-invert p-2 rounded transition-all"
              aria-label="Facebook"
            >
              <Facebook size={20} />
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
