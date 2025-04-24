import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthCheck from '@/components/AuthCheck';
import { mockFamilyMembers } from '@/lib/mockData';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, User } from 'lucide-react';

// Mock gallery images (in a real app, these would be stored in a database)
const mockGalleryImages = [
  {
    id: '1',
    title: 'Smith Family Reunion',
    date: '2022-07-15',
    imageUrl: '/placeholder.svg',
    description: 'Annual family gathering at Smith residence',
    people: ['1', '2', '3', '4', '5'],
  },
  {
    id: '2',
    title: 'David and Emma\'s Wedding',
    date: '1998-05-20',
    imageUrl: '/placeholder.svg',
    description: 'Wedding ceremony in Springfield',
    people: ['3', '5'],
  },
  {
    id: '3',
    title: 'Sarah\'s Graduation',
    date: '2000-06-10',
    imageUrl: '/placeholder.svg',
    description: 'Sarah\'s college graduation ceremony',
    people: ['4', '1', '2'],
  },
  {
    id: '4',
    title: 'Christmas 2020',
    date: '2020-12-25',
    imageUrl: '/placeholder.svg',
    description: 'Christmas celebration at home',
    people: ['3', '5', '7', '8'],
  },
  {
    id: '5',
    title: 'Camping Trip',
    date: '2018-08-05',
    imageUrl: '/placeholder.svg',
    description: 'Summer camping trip to Mountain Lake',
    people: ['3', '5', '7', '8', '9'],
  },
  {
    id: '6',
    title: 'John\'s 70th Birthday',
    date: '2020-05-15',
    imageUrl: '/placeholder.svg',
    description: 'Celebration of John\'s 70th birthday',
    people: ['1', '2', '3', '4', '6', '7', '8', '9'],
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof mockGalleryImages)[0] | null>(null);
  
  const getPersonName = (id: string) => {
    const person = mockFamilyMembers.find(m => m.id === id);
    return person ? person.name : 'Unknown';
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  return (
    <AuthCheck>
      <div className="flex flex-col min-h-screen bg-family-parchment">
        <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-family-brown">Family Gallery</h1>
            <p className="font-lato text-family-charcoal mt-1">
              Precious moments and memories preserved through generations
            </p>
          </div>
          
          <Button className="bg-family-brown hover:bg-family-brown/90">
            Upload Photo
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGalleryImages.map(image => (
            <div
              key={image.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-playfair font-semibold text-family-brown">{image.title}</h3>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{formatDate(image.date)}</span>
                </div>
                <p className="mt-2 font-lato text-family-charcoal text-sm line-clamp-2">
                  {image.description}
                </p>
                <div className="mt-3 flex items-center">
                  <User className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {image.people.length} family members
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-family-parchment">
          {selectedImage && (
            <div className="flex flex-col">
              <div className="bg-white rounded-lg overflow-hidden">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[50vh] object-contain"
                />
              </div>
              
              <div className="mt-4">
                <h2 className="text-2xl font-playfair font-bold text-family-brown">{selectedImage.title}</h2>
                <div className="flex items-center mt-1 text-family-charcoal">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(selectedImage.date)}</span>
                </div>
                
                <p className="mt-4 font-lato text-family-charcoal">
                  {selectedImage.description}
                </p>
                
                <div className="mt-6">
                  <h3 className="text-lg font-playfair font-semibold text-family-brown mb-2">People in this photo:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.people.map(personId => (
                      <div
                        key={personId}
                        className="px-3 py-1 bg-family-cream text-family-brown rounded-full text-sm font-lato"
                      >
                        {getPersonName(personId)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
      </div>
    </AuthCheck>
  );
}