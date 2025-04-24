import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FamilyMember } from '@/lib/types';
import { Search } from 'lucide-react';

interface MemberSearchProps {
  members: FamilyMember[];
  onSearch: (results: FamilyMember[]) => void;
}

export default function MemberSearch({ members, onSearch }: MemberSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<string>('');
  
  const handleSearch = () => {
    let results = [...members];
    
    // Apply name search
    if (searchTerm) {
      results = results.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply generation/date filter
    if (filterBy) {
      const currentYear = new Date().getFullYear();
      
      switch (filterBy) {
        case 'oldest':
          results.sort((a, b) => {
            if (!a.birthDate) return 1;
            if (!b.birthDate) return -1;
            return new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime();
          });
          break;
          
        case 'youngest':
          results.sort((a, b) => {
            if (!a.birthDate) return 1;
            if (!b.birthDate) return -1;
            return new Date(b.birthDate).getTime() - new Date(a.birthDate).getTime();
          });
          break;
          
        case 'gen1': // 1900-1950
          results = results.filter(member => {
            if (!member.birthDate) return false;
            const year = new Date(member.birthDate).getFullYear();
            return year >= 1900 && year <= 1950;
          });
          break;
          
        case 'gen2': // 1951-1980
          results = results.filter(member => {
            if (!member.birthDate) return false;
            const year = new Date(member.birthDate).getFullYear();
            return year >= 1951 && year <= 1980;
          });
          break;
          
        case 'gen3': // 1981-2000
          results = results.filter(member => {
            if (!member.birthDate) return false;
            const year = new Date(member.birthDate).getFullYear();
            return year >= 1981 && year <= 2000;
          });
          break;
          
        case 'gen4': // 2001-present
          results = results.filter(member => {
            if (!member.birthDate) return false;
            const year = new Date(member.birthDate).getFullYear();
            return year >= 2001;
          });
          break;
      }
    }
    
    onSearch(results);
  };
  
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 font-lato"
        />
      </div>
      
      <Select value={filterBy} onValueChange={setFilterBy}>
        <SelectTrigger className="w-full sm:w-[180px] font-lato">
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No Filter</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="youngest">Youngest First</SelectItem>
          <SelectItem value="gen1">Generation 1 (1900-1950)</SelectItem>
          <SelectItem value="gen2">Generation 2 (1951-1980)</SelectItem>
          <SelectItem value="gen3">Generation 3 (1981-2000)</SelectItem>
          <SelectItem value="gen4">Generation 4 (2001+)</SelectItem>
        </SelectContent>
      </Select>
      
      <Button 
        onClick={handleSearch}
        className="bg-family-brown hover:bg-family-brown/90"
      >
        Search
      </Button>
    </div>
  );
}
