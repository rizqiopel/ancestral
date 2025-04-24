import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-family-parchment border-t">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-playfair text-family-brown font-semibold">Ancestral Roots</h3>
            <p className="text-sm font-lato text-muted-foreground">
              Connecting families through generations, preserving history for the future.
            </p>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-playfair text-family-brown font-semibold">Navigation</h4>
              <nav className="flex flex-col space-y-2 text-sm font-lato">
                <Link to="/" className="text-muted-foreground hover:text-family-brown">
                  Home
                </Link>
                <Link to="/tree" className="text-muted-foreground hover:text-family-brown">
                  Family Tree
                </Link>
                <Link to="/members" className="text-muted-foreground hover:text-family-brown">
                  Members
                </Link>
                <Link to="/gallery" className="text-muted-foreground hover:text-family-brown">
                  Gallery
                </Link>
              </nav>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-playfair text-family-brown font-semibold">Resources</h4>
              <nav className="flex flex-col space-y-2 text-sm font-lato">
                <Link to="/help" className="text-muted-foreground hover:text-family-brown">
                  Help Center
                </Link>
                <Link to="/privacy" className="text-muted-foreground hover:text-family-brown">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-muted-foreground hover:text-family-brown">
                  Terms of Service
                </Link>
              </nav>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-playfair text-family-brown font-semibold">Contact</h4>
              <div className="flex flex-col space-y-2 text-sm font-lato">
                <span className="text-muted-foreground">support@ancestralroots.com</span>
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-xs font-lato text-muted-foreground">
            © {new Date().getFullYear()} Ancestral Roots. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}