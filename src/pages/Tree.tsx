import { useState, useEffect } from 'react';
import { FamilyMember } from '@/lib/types';
import { getAllFamilyMembers, updateFamilyMember, addFamilyMember } from '@/lib/mockData';
import { findRootPerson } from '@/lib/treeUtils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthCheck from '@/components/AuthCheck';
import FamilyTreeView from '@/components/FamilyTreeView';
import MemberDetail from '@/components/MemberDetail';
import MemberForm from '@/components/MemberForm';
import TreeExport from '@/components/TreeExport';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Download } from 'lucide-react';

export default function Tree() {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [rootMemberId, setRootMemberId] = useState<string>('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  
  useEffect(() => {
    // Load the family members
    const loadedMembers = getAllFamilyMembers();
    setMembers(loadedMembers);
    
    // Find the default root person
    if (loadedMembers.length > 0) {
      const rootId = findRootPerson(loadedMembers);
      setRootMemberId(rootId);
    }
  }, []);
  
  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMember(member);
  };
  
  const handleCloseDetail = () => {
    setSelectedMember(null);
  };
  
  const handleSaveMember = (updatedMember: FamilyMember) => {
    const isNewMember = members.findIndex(m => m.id === updatedMember.id) === -1;
    
    if (isNewMember) {
      const newMember = addFamilyMember(updatedMember);
      setMembers(prev => [...prev, newMember]);
    } else {
      const updated = updateFamilyMember(updatedMember);
      if (updated) {
        setMembers(prev => prev.map(m => m.id === updated.id ? updated : m));
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
  
  return (
    <AuthCheck>
      <div className="flex flex-col min-h-screen bg-family-parchment">
        <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-family-brown">Family Tree</h1>
            <p className="font-lato text-family-charcoal mt-1">
              Explore your family connections and heritage
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="min-w-[200px]">
              <Select value={rootMemberId} onValueChange={setRootMemberId}>
                <SelectTrigger className="font-lato">
                  <SelectValue placeholder="Select root member" />
                </SelectTrigger>
                <SelectContent>
                  {members.map(member => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleAddMember}
                className="bg-family-brown hover:bg-family-brown/90 gap-2"
              >
                <UserPlus size={16} />
                Add Member
              </Button>
              
              <Button 
                onClick={() => setIsExportModalOpen(true)} 
                variant="outline"
                className="gap-2 border-family-green text-family-green hover:bg-family-green hover:text-white"
              >
                <Download size={16} />
                Export
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <FamilyTreeView 
            members={members} 
            onSelectMember={handleSelectMember} 
            rootMemberId={rootMemberId}
          />
          
          <div className="mt-4 text-center font-lato text-sm text-muted-foreground">
            <p>
              Click and drag to move around the tree. Use the controls in the top right to zoom in/out.
            </p>
            <p className="mt-2">
              Click on a family member to view their details.
            </p>
          </div>
        </div>
      </main>
      
      {selectedMember && (
        <MemberDetail 
          member={selectedMember} 
          onClose={handleCloseDetail} 
          allMembers={members}
          onEdit={handleEditMember}
        />
      )}
      
      <MemberForm 
        member={selectedMember}
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveMember}
        allMembers={members}
      />
      
      <MemberForm
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveMember}
        allMembers={members}
      />
      
      <TreeExport
        open={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        familyMembers={members}
      />
      
      <Footer />
      </div>
    </AuthCheck>
  );
}
