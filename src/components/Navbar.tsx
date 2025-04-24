import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    setIsLoggedIn(auth === 'true');
  }, []);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      // Log out
      localStorage.removeItem('isAuthenticated');
      setIsLoggedIn(false);
    } else {
      // Navigate to login page
      navigate('/login');
    }
  };

  return (
    <header className="w-full border-b bg-family-parchment/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12Z" stroke="#8B5A2B" strokeWidth="2"/>
              <path d="M12 8V16M8 12H16" stroke="#8B5A2B" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-2xl font-playfair text-family-brown font-bold">Ancestral Roots</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-lato text-family-brown hover:text-family-brown/80 transition-colors">
            Home
          </Link>
          <Link to="/tree" className="font-lato text-family-brown hover:text-family-brown/80 transition-colors">
            Family Tree
          </Link>
          <Link to="/members" className="font-lato text-family-brown hover:text-family-brown/80 transition-colors">
            Members
          </Link>
          <Link to="/gallery" className="font-lato text-family-brown hover:text-family-brown/80 transition-colors">
            Gallery
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2 font-lato text-family-brown hover:bg-family-cream/50"
            onClick={handleAuthAction}
          >
            <User className="h-4 w-4" />
            <span>{isLoggedIn ? 'Sign Out' : 'Sign In'}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}