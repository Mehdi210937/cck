import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/videos", label: "Videos" },
    { path: "/sons", label: "Audio" },
    { path: "/ecrits", label: "Texts" },
    { path: "/visuels", label: "Visuals" },
    { path: "/3d", label: "3D" }
  ];

  return (
    <nav className="minimal-nav bg-background">
      <div className="container mx-auto px-6 py-4">
        <div className="flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm tracking-wide transition-colors ${
                location.pathname === item.path 
                  ? 'text-foreground active' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;