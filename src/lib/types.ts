
// Define types for our family tree application

export interface FamilyMember {
    id: string;
    name: string;
    gender: 'male' | 'female' | 'other';
    birthDate?: string;
    deathDate?: string;
    imageUrl?: string;
    bio?: string;
    relationships: Relationship[];
  }
  
  export interface Relationship {
    type: RelationshipType;
    personId: string;
  }
  
  export enum RelationshipType {
    PARENT = 'parent',
    CHILD = 'child',
    SPOUSE = 'spouse',
    SIBLING = 'sibling'
  }
  
  export interface TreeNode {
    member: FamilyMember;
    spouses?: TreeNode[];
    children?: TreeNode[];
    parents?: TreeNode[];
    siblings?: TreeNode[];
    level: number;
    x?: number;
    y?: number;
  }