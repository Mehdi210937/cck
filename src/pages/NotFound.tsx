import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <p className="label-editorial mb-4">Erreur</p>
      <h1 className="text-8xl font-serif text-foreground/20 mb-6">404</h1>
      <p className="text-sm text-muted-foreground mb-8">Page introuvable</p>
      <a
        href="/"
        className="text-xs tracking-[0.15em] uppercase text-accent hover:text-foreground transition-colors duration-300 link-reveal"
      >
        Retour
      </a>
    </div>
  );
};

export default NotFound;
