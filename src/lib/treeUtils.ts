import { FamilyMember, RelationshipType, TreeNode } from './types';
import { getFamilyMemberById } from './mockData';

// Build the family tree starting from a root person
export const buildFamilyTree = (
  rootPersonId: string,
  allMembers: FamilyMember[]
): TreeNode | null => {
  const rootPerson = allMembers.find(member => member.id === rootPersonId);
  if (!rootPerson) return null;
  
  // Create a map for O(1) lookups
  const membersMap = new Map<string, FamilyMember>();
  allMembers.forEach(member => membersMap.set(member.id, member));
  
  // Keep track of processed members to avoid circular relationships
  const processedIds = new Set<string>();
  
  // Build the tree recursively
  const buildNode = (person: FamilyMember, level: number): TreeNode => {
    processedIds.add(person.id);
    
    const node: TreeNode = {
      member: person,
      level,
      children: [],
      parents: [],
      spouses: [],
      siblings: []
    };
    
    // Process relationships
    person.relationships.forEach(rel => {
      const relatedPerson = membersMap.get(rel.personId);
      if (!relatedPerson) return;
      
      switch (rel.type) {
        case RelationshipType.CHILD:
          if (!processedIds.has(rel.personId)) {
            node.children?.push(buildNode(relatedPerson, level + 1));
          }
          break;
          
        case RelationshipType.PARENT:
          if (!processedIds.has(rel.personId)) {
            node.parents?.push(buildNode(relatedPerson, level - 1));
          }
          break;
          
        case RelationshipType.SPOUSE:
          if (!processedIds.has(rel.personId)) {
            node.spouses?.push(buildNode(relatedPerson, level));
          }
          break;
          
        case RelationshipType.SIBLING:
          if (!processedIds.has(rel.personId)) {
            node.siblings?.push(buildNode(relatedPerson, level));
          }
          break;
      }
    });
    
    return node;
  };
  
  return buildNode(rootPerson, 0);
};

// Function to find the root person (someone who doesn't have parents or has the most children)
export const findRootPerson = (members: FamilyMember[]): string => {
  if (members.length === 0) return '';
  
  // First try to find the oldest person (typically at the top of the tree)
  let oldestPerson: FamilyMember | null = null;
  let earliestDate = new Date();
  
  members.forEach(member => {
    if (member.birthDate) {
      const birthDate = new Date(member.birthDate);
      if (birthDate < earliestDate) {
        earliestDate = birthDate;
        oldestPerson = member;
      }
    }
  });
  
  if (oldestPerson) return oldestPerson.id;
  
  // If we can't determine by age, find person with most children
  let mostChildren = -1;
  let personWithMostChildren: FamilyMember | null = null;
  
  members.forEach(member => {
    const childCount = member.relationships.filter(
      rel => rel.type === RelationshipType.CHILD
    ).length;
    
    if (childCount > mostChildren) {
      mostChildren = childCount;
      personWithMostChildren = member;
    }
  });
  
  return personWithMostChildren ? personWithMostChildren.id : members[0].id;
};

// Helper function to get all relationships of a specific type for a member
export const getRelationshipsByType = (
  member: FamilyMember,
  type: RelationshipType
): FamilyMember[] => {
  return member.relationships
    .filter(rel => rel.type === type)
    .map(rel => {
      const related = getFamilyMemberById(rel.personId);
      return related ? related : null;
    })
    .filter((member): member is FamilyMember => member !== null);
};

// Function to calculate positions for tree nodes for visualization
export const calculateTreeLayout = (rootNode: TreeNode): TreeNode => {
  // This is a simplistic layout algorithm
  // In a real-world app, you'd use a more sophisticated algorithm
  
  // Clone the tree to avoid modifying the original
  const treeRoot = JSON.parse(JSON.stringify(rootNode)) as TreeNode;
  
  // Assign X and Y coordinates based on level
  const assignCoordinates = (
    node: TreeNode,
    level: number,
    indexInLevel: number,
    levelWidths: Map<number, number>
  ) => {
    // Track how many nodes are at each level for positioning
    const currentWidth = levelWidths.get(level) || 0;
    levelWidths.set(level, currentWidth + 1);
    
    // Position the node
    node.level = level;
    node.x = indexInLevel * 200; // Horizontal spacing
    node.y = level * 150;        // Vertical spacing
    
    // Recursively position children
    if (node.children) {
      node.children.forEach((child, i) => {
        assignCoordinates(child, level + 1, currentWidth + i, levelWidths);
      });
    }
    
    // Position spouses to the right of the node
    if (node.spouses) {
      node.spouses.forEach((spouse, i) => {
        spouse.x = node.x + 100 + (i * 50);
        spouse.y = node.y;
        spouse.level = level;
      });
    }
    
    return node;
  };
  
  return assignCoordinates(treeRoot, 0, 0, new Map<number, number>());
};

// Function to add a new relationship between two people
export const addRelationship = (
  person1Id: string,
  person2Id: string,
  relationshipType: RelationshipType,
  allMembers: FamilyMember[]
): FamilyMember[] => {
  const updatedMembers = [...allMembers];
  
  const idx1 = updatedMembers.findIndex(m => m.id === person1Id);
  const idx2 = updatedMembers.findIndex(m => m.id === person2Id);
  
  if (idx1 === -1 || idx2 === -1) return allMembers;
  
  // Add the primary relationship
  updatedMembers[idx1].relationships.push({
    type: relationshipType,
    personId: person2Id
  });
  
  // Add the inverse relationship
  let inverseType: RelationshipType;
  switch (relationshipType) {
    case RelationshipType.PARENT:
      inverseType = RelationshipType.CHILD;
      break;
    case RelationshipType.CHILD:
      inverseType = RelationshipType.PARENT;
      break;
    case RelationshipType.SPOUSE:
      inverseType = RelationshipType.SPOUSE;
      break;
    case RelationshipType.SIBLING:
      inverseType = RelationshipType.SIBLING;
      break;
    default:
      inverseType = relationshipType;
  }
  
  updatedMembers[idx2].relationships.push({
    type: inverseType,
    personId: person1Id
  });
  
  return updatedMembers;
};