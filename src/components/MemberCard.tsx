import { FamilyMember } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface MemberCardProps {
  member: FamilyMember;
  onSelect: (member: FamilyMember) => void;
  isSelected?: boolean;
}

export default function MemberCard({ member, onSelect, isSelected = false }: MemberCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getAge = (birthDate?: string, deathDate?: string) => {
    if (!birthDate) return 'Unknown';
    
    const birth = new Date(birthDate);
    const end = deathDate ? new Date(deathDate) : new Date();
    const age = end.getFullYear() - birth.getFullYear();
    
    return deathDate 
      ? `${age} (${birth.getFullYear()} - ${end.getFullYear()})`
      : `${age} years`;
  };

  return (
    <Card 
      className={`w-64 transition-all duration-200 hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 border-2 border-family-cream">
            <AvatarImage src={member.imageUrl} alt={member.name} />
            <AvatarFallback className="bg-family-green text-white">{getInitials(member.name)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="font-playfair text-family-brown">{member.name}</CardTitle>
            <CardDescription className="font-lato text-sm">
              Age: {getAge(member.birthDate, member.deathDate)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-sm font-lato">
        {member.bio ? (
          <p className="line-clamp-3 text-family-charcoal">{member.bio}</p>
        ) : (
          <p className="text-muted-foreground italic">No biography available</p>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full border-family-green text-family-green hover:bg-family-green hover:text-white"
          onClick={() => onSelect(member)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}