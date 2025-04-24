
import { FamilyMember, RelationshipType } from './types';

// Mock data for the family tree
export const mockFamilyMembers: FamilyMember[] = [
  {
    id: '1',
    name: 'John Smith',
    gender: 'male',
    birthDate: '1950-05-15',
    imageUrl: '/placeholder.svg',
    bio: 'Founder of the Smith family line',
    relationships: [
      { type: RelationshipType.SPOUSE, personId: '2' },
      { type: RelationshipType.CHILD, personId: '3' },
      { type: RelationshipType.CHILD, personId: '4' }
    ]
  },
  {
    id: '2',
    name: 'Mary Smith',
    gender: 'female',
    birthDate: '1952-08-22',
    imageUrl: '/placeholder.svg',
    bio: 'Co-founder of the Smith family',
    relationships: [
      { type: RelationshipType.SPOUSE, personId: '1' },
      { type: RelationshipType.CHILD, personId: '3' },
      { type: RelationshipType.CHILD, personId: '4' }
    ]
  },
  {
    id: '3',
    name: 'David Smith',
    gender: 'male',
    birthDate: '1975-03-10',
    imageUrl: '/placeholder.svg',
    bio: 'Eldest son of John and Mary',
    relationships: [
      { type: RelationshipType.PARENT, personId: '1' },
      { type: RelationshipType.PARENT, personId: '2' },
      { type: RelationshipType.SIBLING, personId: '4' },
      { type: RelationshipType.SPOUSE, personId: '5' },
      { type: RelationshipType.CHILD, personId: '7' },
      { type: RelationshipType.CHILD, personId: '8' }
    ]
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    gender: 'female',
    birthDate: '1978-11-25',
    imageUrl: '/placeholder.svg',
    bio: 'Daughter of John and Mary, married to Michael Johnson',
    relationships: [
      { type: RelationshipType.PARENT, personId: '1' },
      { type: RelationshipType.PARENT, personId: '2' },
      { type: RelationshipType.SIBLING, personId: '3' },
      { type: RelationshipType.SPOUSE, personId: '6' },
      { type: RelationshipType.CHILD, personId: '9' }
    ]
  },
  {
    id: '5',
    name: 'Emma Smith',
    gender: 'female',
    birthDate: '1977-07-12',
    imageUrl: '/placeholder.svg',
    bio: 'Wife of David Smith',
    relationships: [
      { type: RelationshipType.SPOUSE, personId: '3' },
      { type: RelationshipType.CHILD, personId: '7' },
      { type: RelationshipType.CHILD, personId: '8' }
    ]
  },
  {
    id: '6',
    name: 'Michael Johnson',
    gender: 'male',
    birthDate: '1976-02-18',
    imageUrl: '/placeholder.svg',
    bio: 'Husband of Sarah Johnson',
    relationships: [
      { type: RelationshipType.SPOUSE, personId: '4' },
      { type: RelationshipType.CHILD, personId: '9' }
    ]
  },
  {
    id: '7',
    name: 'James Smith',
    gender: 'male',
    birthDate: '1998-12-05',
    imageUrl: '/placeholder.svg',
    bio: 'Son of David and Emma Smith',
    relationships: [
      { type: RelationshipType.PARENT, personId: '3' },
      { type: RelationshipType.PARENT, personId: '5' },
      { type: RelationshipType.SIBLING, personId: '8' }
    ]
  },
  {
    id: '8',
    name: 'Olivia Smith',
    gender: 'female',
    birthDate: '2001-04-30',
    imageUrl: '/placeholder.svg',
    bio: 'Daughter of David and Emma Smith',
    relationships: [
      { type: RelationshipType.PARENT, personId: '3' },
      { type: RelationshipType.PARENT, personId: '5' },
      { type: RelationshipType.SIBLING, personId: '7' }
    ]
  },
  {
    id: '9',
    name: 'Sophia Johnson',
    gender: 'female',
    birthDate: '2000-09-20',
    imageUrl: '/placeholder.svg',
    bio: 'Daughter of Sarah and Michael Johnson',
    relationships: [
      { type: RelationshipType.PARENT, personId: '4' },
      { type: RelationshipType.PARENT, personId: '6' }
    ]
  }
];

// Helper function to get a family member by ID
export const getFamilyMemberById = (id: string): FamilyMember | undefined => {
  return mockFamilyMembers.find(member => member.id === id);
};

// Helper function to get all family members
export const getAllFamilyMembers = (): FamilyMember[] => {
  return [...mockFamilyMembers];
};

// Helper function to add a new family member to the mock data
export const addFamilyMember = (member: FamilyMember): FamilyMember => {
  mockFamilyMembers.push(member);
  return member;
};

// Helper function to update a family member
export const updateFamilyMember = (updatedMember: FamilyMember): FamilyMember | undefined => {
  const index = mockFamilyMembers.findIndex(member => member.id === updatedMember.id);
  if (index !== -1) {
    mockFamilyMembers[index] = updatedMember;
    return updatedMember;
  }
  return undefined;
};

// Helper function to delete a family member
export const deleteFamilyMember = (id: string): boolean => {
  const index = mockFamilyMembers.findIndex(member => member.id === id);
  if (index !== -1) {
    mockFamilyMembers.splice(index, 1);
    return true;
  }
  return false;
};
