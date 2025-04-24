import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FamilyMember, RelationshipType } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  gender: z.enum(['male', 'female', 'other']),
  birthDate: z.string().optional(),
  deathDate: z.string().optional(),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface MemberFormProps {
  member?: FamilyMember;
  open: boolean;
  onClose: () => void;
  onSave: (member: FamilyMember) => void;
  allMembers: FamilyMember[];
}

export default function MemberForm({ member, open, onClose, onSave, allMembers }: MemberFormProps) {
  const [relationships, setRelationships] = useState<{
    type: RelationshipType;
    personId: string;
  }[]>(member?.relationships || []);
  
  const [newRelation, setNewRelation] = useState<{
    type: RelationshipType | '';
    personId: string;
  }>({
    type: '',
    personId: '',
  });
  
  // Set up the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: member?.name || '',
      gender: member?.gender || 'other',
      birthDate: member?.birthDate || '',
      deathDate: member?.deathDate || '',
      bio: member?.bio || '',
      imageUrl: member?.imageUrl || '/placeholder.svg',
    },
  });

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    const newMember: FamilyMember = {
      id: member?.id || `new-${Date.now()}`,
      name: values.name,
      gender: values.gender,
      birthDate: values.birthDate,
      deathDate: values.deathDate,
      bio: values.bio,
      imageUrl: values.imageUrl,
      relationships,
    };
    
    onSave(newMember);
    onClose();
  };
  
  // Handle adding a new relationship
  const addRelationship = () => {
    if (!newRelation.type || !newRelation.personId) return;
    
    setRelationships(prev => [
      ...prev,
      {
        type: newRelation.type as RelationshipType,
        personId: newRelation.personId,
      },
    ]);
    
    setNewRelation({ type: '', personId: '' });
  };
  
  // Handle removing a relationship
  const removeRelationship = (index: number) => {
    setRelationships(prev => prev.filter((_, i) => i !== index));
  };
  
  const getPersonName = (id: string) => {
    const person = allMembers.find(m => m.id === id);
    return person ? person.name : 'Unknown';
  };
  
  const relationshipLabels = {
    [RelationshipType.PARENT]: 'Parent',
    [RelationshipType.CHILD]: 'Child',
    [RelationshipType.SPOUSE]: 'Spouse',
    [RelationshipType.SIBLING]: 'Sibling',
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-family-parchment">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-family-brown">
            {member ? 'Edit Family Member' : 'Add New Family Member'}
          </DialogTitle>
          <DialogDescription className="font-lato">
            Fill in the details below to {member ? 'update' : 'create'} a family member profile.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-playfair text-family-brown">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} className="font-lato" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-playfair text-family-brown">Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-lato">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-lato">Female</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-lato">Other</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-playfair text-family-brown">Birth Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="font-lato" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="deathDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-playfair text-family-brown">Death Date (if applicable)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="font-lato" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-playfair text-family-brown">Profile Image URL</FormLabel>
                    <div className="flex gap-4 items-center">
                      <FormControl>
                        <Input {...field} className="font-lato" />
                      </FormControl>
                      <Avatar className="h-10 w-10 border-2 border-family-cream">
                        <AvatarImage src={field.value} />
                        <AvatarFallback className="bg-family-green text-white">
                          {form.getValues().name ? getInitials(form.getValues().name) : 'N/A'}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="font-playfair text-family-brown">Biography</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell the story of this family member..." 
                        {...field} 
                        className="font-lato h-24"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-playfair text-xl text-family-brown mb-4">Family Relationships</h3>
              
              {relationships.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-playfair text-base text-family-brown mb-2">Current Relationships</h4>
                  <ul className="space-y-2">
                    {relationships.map((rel, index) => (
                      <li key={index} className="flex items-center justify-between bg-white/50 p-2 rounded">
                        <div className="flex items-center gap-2">
                          <span className="font-lato font-semibold">{relationshipLabels[rel.type]}:</span>
                          <span className="font-lato">{getPersonName(rel.personId)}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeRelationship(index)}
                          className="text-destructive hover:text-destructive/90"
                        >
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex flex-col gap-4">
                <h4 className="font-playfair text-base text-family-brown">Add New Relationship</h4>
                <div className="flex flex-wrap gap-2">
                  <Select 
                    value={newRelation.type}
                    onValueChange={(value) => setNewRelation(prev => ({ ...prev, type: value as RelationshipType }))}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Relationship Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={RelationshipType.PARENT}>Parent</SelectItem>
                      <SelectItem value={RelationshipType.CHILD}>Child</SelectItem>
                      <SelectItem value={RelationshipType.SPOUSE}>Spouse</SelectItem>
                      <SelectItem value={RelationshipType.SIBLING}>Sibling</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={newRelation.personId}
                    onValueChange={(value) => setNewRelation(prev => ({ ...prev, personId: value }))}
                  >
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Select Person" />
                    </SelectTrigger>
                    <SelectContent>
                      {allMembers
                        .filter(m => m.id !== member?.id)
                        .map(m => (
                          <SelectItem key={m.id} value={m.id}>
                            {m.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={addRelationship}
                    disabled={!newRelation.type || !newRelation.personId}
                    className="border-family-green text-family-green hover:bg-family-green hover:text-white"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-family-brown hover:bg-family-brown/90">
                {member ? 'Update' : 'Create'} Member
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}