import { useState, useEffect } from 'react';
import { FamilyMember } from '@/lib/types';
import { getAllFamilyMembers, updateFamilyMember, addFamilyMember } from '@/lib/mockData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthCheck from '@/components/AuthCheck';
import MemberCard from '@/components/MemberCard';
import MemberDetail from '@/components/MemberDetail';
import MemberForm from '@/components/MemberForm';
import MemberSearch from '@/components/MemberSearch';
import CollaborationHint from '@/components/CollaborationHint';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

export default function Members() {
  const [allMembers, setAllMembers] = useState<FamilyMember[]>([]);
  const [displayedMembers, setDisplayedMembers] = useState<FamilyMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  useEffect(() => {
    // Load the family members
    const loadedMembers = getAllFamilyMembers();
    setAllMembers(loadedMembers);
    setDisplayedMembers(loadedMembers);
  }, []);
  
  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMember(member);
  };
  
  const handleCloseDetail = () => {
    setSelectedMember(null);
  };
  
  const handleSaveMember = (updatedMember: FamilyMember) => {
    const isNewMember = allMembers.findIndex(m => m.id === updatedMember.id) === -1;
    
    if (isNewMember) {
      const newMember = addFamilyMember(updatedMember);
      setAllMembers(prev => [...prev, newMember]);
      setDisplayedMembers(prev => [...prev, newMember]);
    } else {
      const updated = updateFamilyMember(updatedMember);
      if (updated) {
        setAllMembers(prev => prev.map(m => m.id === updated.id ? updated : m));
        setDisplayedMembers(prev => prev.map(m => m.id === updated.id ? updated : m));
        if (selectedMember?.id === updated.id) {
          setSelectedMember(updated);
        }
      }
    }
  };
  
  const handleEditMember = (member: FamilyMember) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };
  
  const handleAddMember = () => {
    setIsAddModalOpen(true);
  };
  
  const handleSearch = (results: FamilyMember[]) => {
    setDisplayedMembers(results);
  };
  
  return (
    <AuthCheck>
      <div className="flex flex-col min-h-screen bg-family-parchment">
        <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-family-brown">Family Members</h1>
            <p className="font-lato text-family-charcoal mt-1">
              Browse and manage your family members
            </p>
          </div>
          
          <Button 
            onClick={handleAddMember}
            className="bg-family-brown hover:bg-family-brown/90 gap-2"
          >
            <UserPlus size={16} />
            Add Member
          </Button>
        </div>
        
        <div className="mb-6">
          <CollaborationHint />
        </div>
        
        <MemberSearch members={allMembers} onSearch={handleSearch} />
        
        {displayedMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedMembers.map(member => (
              <MemberCard 
                key={member.id} 
                member={member} 
                onSelect={handleSelectMember}
                isSelected={selectedMember?.id === member.id}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg shadow-sm">
            <p className="text-xl font-playfair text-family-brown mb-2">No family members found</p>
            <p className="font-lato text-muted-foreground mb-4">
              Try adjusting your search filters or add a new family member.
            </p>
            <Button onClick={handleAddMember} className="bg-family-brown hover:bg-family-brown/90">
              Add First Member
            </Button>
          </div>
        )}
      </main>
      
      {selectedMember && (
        <MemberDetail 
          member={selectedMember} 
          onClose={handleCloseDetail} 
          allMembers={allMembers}
          onEdit={handleEditMember}
        />
      )}
      
      <MemberForm 
        member={selectedMember}
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveMember}
        allMembers={allMembers}
      />
      
      <MemberForm
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveMember}
        allMembers={allMembers}
      />
      
      <Footer />
      </div>
    </AuthCheck>
  );
}