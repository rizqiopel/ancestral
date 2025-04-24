import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Users } from 'lucide-react';

export default function CollaborationHint() {
  const handleInvite = () => {
    // In a real app, this would open an invite modal or form
    toast({
      title: "Collaboration Coming Soon",
      description: "The ability to invite family members for collaborative editing will be available in the next update.",
    });
  };
  
  return (
    <div className="bg-white/70 rounded-lg p-4 border border-family-cream shadow-sm">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-family-green/20 flex items-center justify-center">
          <Users className="h-6 w-6 text-family-green" />
        </div>
        
        <div className="flex-grow text-center sm:text-left">
          <h3 className="text-lg font-playfair font-semibold text-family-brown">Collaborate with Family</h3>
          <p className="font-lato text-family-charcoal text-sm">
            Invite family members to help build and maintain your family tree together.
          </p>
        </div>
        
        <Button
          onClick={handleInvite}
          variant="outline"
          className="flex-shrink-0 border-family-green text-family-green hover:bg-family-green hover:text-white"
        >
          Invite Family
        </Button>
      </div>
    </div>
  );
}