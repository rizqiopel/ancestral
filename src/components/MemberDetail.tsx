import { useState } from 'react';
import { FamilyMember, RelationshipType } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getRelationshipsByType } from '@/lib/treeUtils';
import { Calendar, User, Users } from 'lucide-react';

interface MemberDetailProps {
  member: FamilyMember | null;
  onClose: () => void;
  allMembers: FamilyMember[];
  onEdit: (member: FamilyMember) => void;
}

export default function MemberDetail({ member, onClose, allMembers, onEdit }: MemberDetailProps) {
  const [activeTab, setActiveTab] = useState('info');

  if (!member) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const parents = getRelationshipsByType(member, RelationshipType.PARENT);
  const children = getRelationshipsByType(member, RelationshipType.CHILD);
  const spouses = getRelationshipsByType(member, RelationshipType.SPOUSE);
  const siblings = getRelationshipsByType(member, RelationshipType.SIBLING);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Dialog open={!!member} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-family-parchment">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-family-cream">
              <AvatarImage src={member.imageUrl} />
              <AvatarFallback className="bg-family-green text-white text-lg">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl font-playfair text-family-brown">{member.name}</DialogTitle>
              <DialogDescription className="font-lato">
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Born: {formatDate(member.birthDate)}</span>
                  {member.deathDate && (
                    <span className="ml-3">Died: {formatDate(member.deathDate)}</span>
                  )}
                </div>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-3 bg-family-cream">
            <TabsTrigger value="info" className="font-lato">Personal Info</TabsTrigger>
            <TabsTrigger value="relationships" className="font-lato">Relationships</TabsTrigger>
            <TabsTrigger value="timeline" className="font-lato">Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="mt-4">
            <Card className="bg-white/80">
              <CardHeader className="font-playfair text-xl text-family-brown border-b">Biography</CardHeader>
              <CardContent className="pt-4 font-lato">
                {member.bio ? (
                  <p className="text-family-charcoal">{member.bio}</p>
                ) : (
                  <p className="text-muted-foreground italic">No biography available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="relationships" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-white/80">
                <CardHeader className="flex flex-row items-center font-playfair text-family-brown border-b">
                  <User className="mr-2 h-5 w-5" />
                  <span>Parents</span>
                </CardHeader>
                <CardContent className="pt-4">
                  {parents.length > 0 ? (
                    <ul className="space-y-2">
                      {parents.map(parent => (
                        <li key={parent.id} className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={parent.imageUrl} />
                            <AvatarFallback className="bg-family-green text-white text-xs">
                              {getInitials(parent.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-lato">{parent.name}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground italic font-lato">No parents recorded</p>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-white/80">
                <CardHeader className="flex flex-row items-center font-playfair text-family-brown border-b">
                  <User className="mr-2 h-5 w-5" />
                  <span>Spouses</span>
                </CardHeader>
                <CardContent className="pt-4">
                  {spouses.length > 0 ? (
                    <ul className="space-y-2">
                      {spouses.map(spouse => (
                        <li key={spouse.id} className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={spouse.imageUrl} />
                            <AvatarFallback className="bg-family-green text-white text-xs">
                              {getInitials(spouse.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-lato">{spouse.name}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground italic font-lato">No spouses recorded</p>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-white/80">
                <CardHeader className="flex flex-row items-center font-playfair text-family-brown border-b">
                  <Users className="mr-2 h-5 w-5" />
                  <span>Children</span>
                </CardHeader>
                <CardContent className="pt-4">
                  {children.length > 0 ? (
                    <ul className="space-y-2">
                      {children.map(child => (
                        <li key={child.id} className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={child.imageUrl} />
                            <AvatarFallback className="bg-family-green text-white text-xs">
                              {getInitials(child.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-lato">{child.name}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground italic font-lato">No children recorded</p>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-white/80">
                <CardHeader className="flex flex-row items-center font-playfair text-family-brown border-b">
                  <Users className="mr-2 h-5 w-5" />
                  <span>Siblings</span>
                </CardHeader>
                <CardContent className="pt-4">
                  {siblings.length > 0 ? (
                    <ul className="space-y-2">
                      {siblings.map(sibling => (
                        <li key={sibling.id} className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={sibling.imageUrl} />
                            <AvatarFallback className="bg-family-green text-white text-xs">
                              {getInitials(sibling.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-lato">{sibling.name}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground italic font-lato">No siblings recorded</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-4">
            <Card className="bg-white/80">
              <CardHeader className="font-playfair text-xl text-family-brown border-b">Life Events</CardHeader>
              <CardContent className="pt-4">
                <ul className="relative border-l border-family-brown ml-2 space-y-6 py-2">
                  {member.birthDate && (
                    <li className="ml-6 relative">
                      <span className="absolute -left-[27px] flex h-6 w-6 items-center justify-center rounded-full bg-family-brown text-white">
                        <Calendar className="h-3 w-3" />
                      </span>
                      <h3 className="font-playfair text-family-brown">Birth</h3>
                      <p className="font-lato text-sm text-muted-foreground">
                        {formatDate(member.birthDate)}
                      </p>
                    </li>
                  )}
                  
                  {/* We could add more life events here from a real database */}
                  {member.deathDate && (
                    <li className="ml-6 relative">
                      <span className="absolute -left-[27px] flex h-6 w-6 items-center justify-center rounded-full bg-family-brown text-white">
                        <Calendar className="h-3 w-3" />
                      </span>
                      <h3 className="font-playfair text-family-brown">Death</h3>
                      <p className="font-lato text-sm text-muted-foreground">
                        {formatDate(member.deathDate)}
                      </p>
                    </li>
                  )}
                  
                  {!member.birthDate && !member.deathDate && (
                    <p className="text-muted-foreground italic">No timeline events available</p>
                  )}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={() => onEdit(member)} className="bg-family-brown hover:bg-family-brown/90">
            Edit Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}