import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-cracra-green bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 py-3">
        <Link 
          to="/" 
          className="inline-block cracra-hover"
        >
          <h1 
            className="text-2xl md:text-4xl font-bold glitch-text text-cracra-yellow graffiti-shadow"
            data-text="CRACRAKREW"
          >
            CRACRAKREW
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;