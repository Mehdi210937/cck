import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "NEWS", icon: "📰" },
    { path: "/videos", label: "ODIEUSES VIDEOS", icon: "📹" },
    { path: "/sons", label: "IMMONDES SONS", icon: "🎵" },
    { path: "/ecrits", label: "TERRIFIANTS ECRITS", icon: "📝" },
    { path: "/visuels", label: "INFÂMES VISUELS", icon: "🎨" },
    { path: "/3d", label: "IGNOBLE 3D", icon: "🗿" }
  ];

  return (
    <nav className="nav-cracra p-4 mb-8 mx-4 rounded-lg">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {navItems.map((item) => (
          <Button
            key={item.path}
            asChild
            variant={location.pathname === item.path ? "default" : "outline"}
            className="cracra-hover text-xs md:text-sm px-2 md:px-4 py-2"
          >
            <Link to={item.path}>
              <span className="mr-1">{item.icon}</span>
              {item.label}
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;