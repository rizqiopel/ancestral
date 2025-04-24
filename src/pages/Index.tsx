import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroBackground from '@/components/HeroBackground';

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-family-parchment">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 text-center relative overflow-hidden">
          <HeroBackground />
          <div className="container mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-family-brown mb-4">
              Discover Your Family History
            </h1>
            <p className="text-xl md:text-2xl font-lato text-family-charcoal mb-8 max-w-3xl mx-auto">
              Build your family tree, preserve memories, and connect generations with our interactive genealogy platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Button asChild className="bg-family-brown hover:bg-family-brown/90 text-white font-lato">
                <Link to="/tree">View Family Tree</Link>
              </Button>
              <Button asChild variant="outline" className="border-family-green text-family-green hover:bg-family-green hover:text-white">
                <Link to="/members">Explore Members</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-family-cream/30">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-playfair font-bold text-family-brown text-center mb-12">
              Preserve Your Family Legacy
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-family-green/20 rounded-full flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#7D9D9C" strokeWidth="2"/>
                    <path d="M18 20C18 16.6863 15.3137 14 12 14C8.68629 14 6 16.6863 6 20" stroke="#7D9D9C" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-family-brown mb-2">Create Family Profiles</h3>
                <p className="font-lato text-family-charcoal">
                  Add detailed profiles for each family member with photos, stories, and important dates.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-family-green/20 rounded-full flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 5V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V5C20 4.46957 19.7893 3.96086 19.4142 3.58579C19.0391 3.21071 18.5304 3 18 3H6C5.46957 3 4.96086 3.21071 4.58579 3.58579C4.21071 3.96086 4 4.46957 4 5Z" stroke="#7D9D9C" strokeWidth="2"/>
                    <path d="M16 12L12 16M12 16L8 12M12 16V8" stroke="#7D9D9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-family-brown mb-2">Interactive Tree View</h3>
                <p className="font-lato text-family-charcoal">
                  Visualize your family connections with an interactive, expandable tree interface.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-family-green/20 rounded-full flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V5M12 19V20M4 12H5M19 12H20M6.34315 6.34315L7.05025 7.05025M17.6569 17.6569L16.9498 16.9498M6.34315 17.6569L7.05025 16.9498M17.6569 6.34315L16.9498 7.05025M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="#7D9D9C" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-semibold text-family-brown mb-2">Share Family Stories</h3>
                <p className="font-lato text-family-charcoal">
                  Preserve and share important stories, traditions, and memories across generations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 px-4 md:px-6 bg-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-playfair font-bold text-family-brown mb-4">
              Start Building Your Family Tree Today
            </h2>
            <p className="text-lg font-lato text-family-charcoal mb-8">
              It takes just minutes to begin documenting your family history for generations to come.
            </p>
            <Button asChild className="bg-family-brown hover:bg-family-brown/90 text-white font-lato px-8 py-6 text-lg">
              <Link to="/tree">Get Started</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}