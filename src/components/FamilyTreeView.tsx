import { useEffect, useRef, useState } from 'react';
import { TreeNode, FamilyMember } from '@/lib/types';
import { buildFamilyTree, calculateTreeLayout, findRootPerson } from '@/lib/treeUtils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface FamilyTreeViewProps {
  members: FamilyMember[];
  onSelectMember: (member: FamilyMember) => void;
  rootMemberId?: string;
}

export default function FamilyTreeView({ members, onSelectMember, rootMemberId }: FamilyTreeViewProps) {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (members.length === 0) return;
    
    const rootId = rootMemberId || findRootPerson(members);
    if (!rootId) return;
    
    const tree = buildFamilyTree(rootId, members);
    if (tree) {
      const layoutTree = calculateTreeLayout(tree);
      setTreeData(layoutTree);
    }
  }, [members, rootMemberId]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left mouse button
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };
  
  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };
  
  const resetView = () => {
    setPan({ x: 0, y: 0 });
    setScale(1);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  // Function to render a single node
  const renderNode = (node: TreeNode) => {
    const member = node.member;
    
    return (
      <g key={member.id} transform={`translate(${node.x}, ${node.y})`}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <g 
                className="cursor-pointer" 
                onClick={() => onSelectMember(member)}
              >
                <rect
                  x="-50"
                  y="-25"
                  width="100"
                  height="50"
                  rx="10"
                  fill={member.gender === 'male' ? '#E6F7FF' : member.gender === 'female' ? '#FFEBEE' : '#F5F5F5'}
                  stroke="#8B5A2B"
                  strokeWidth="2"
                  className="shadow-md"
                />
                <foreignObject x="-30" y="-20" width="20" height="20">
                  <div className="h-full w-full">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={member.imageUrl} alt={member.name} />
                      <AvatarFallback className="text-[6px] bg-family-green text-white">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </foreignObject>
                <text
                  x="0"
                  y="3"
                  textAnchor="middle"
                  fontSize="12"
                  fontFamily="Lato, sans-serif"
                  fill="#333333"
                >
                  {member.name}
                </text>
              </g>
            </TooltipTrigger>
            <TooltipContent>
              <div>
                <p className="font-bold">{member.name}</p>
                {member.birthDate && (
                  <p className="text-xs">Born: {new Date(member.birthDate).toLocaleDateString()}</p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Draw lines to parents */}
        {node.parents?.map(parent => (
          <line
            key={`parent-${parent.member.id}`}
            x1="0"
            y1="-25"
            x2="0"
            y2="-50"
            stroke="#8B5A2B"
            strokeWidth="1.5"
          />
        ))}
        
        {/* Draw lines to children */}
        {node.children?.map((child, i) => {
          const childX = child.x ?? 0;
          const childY = child.y ?? 0;
          const xDiff = childX - (node.x ?? 0);
          const yDiff = childY - (node.y ?? 0);
          
          return (
            <line
              key={`child-${child.member.id}`}
              x1="0"
              y1="25"
              x2={xDiff}
              y2={yDiff - 25}
              stroke="#8B5A2B"
              strokeWidth="1.5"
            />
          );
        })}
        
        {/* Draw lines to spouses */}
        {node.spouses?.map((spouse, i) => {
          const spouseX = spouse.x ?? 0;
          const spouseY = spouse.y ?? 0;
          const xDiff = spouseX - (node.x ?? 0);
          
          return (
            <g key={`spouse-${spouse.member.id}`}>
              <line
                x1="50"
                y1="0"
                x2={xDiff - 50}
                y2="0"
                stroke="#8B5A2B"
                strokeWidth="1.5"
                strokeDasharray="5,3"
              />
              {renderNode(spouse)}
            </g>
          );
        })}
        
        {/* Recursively render child nodes */}
        {node.children?.map(childNode => renderNode(childNode))}
      </g>
    );
  };
  
  if (!treeData) {
    return (
      <div className="flex items-center justify-center h-96 bg-family-parchment rounded-lg">
        <p className="text-family-brown font-playfair">No family tree data available</p>
      </div>
    );
  }
  
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-family-parchment rounded-lg border border-family-cream">
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={zoomIn}
          className="rounded-full h-8 w-8 bg-white/80 hover:bg-white"
        >
          +
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={zoomOut}
          className="rounded-full h-8 w-8 bg-white/80 hover:bg-white"
        >
          -
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={resetView}
          className="rounded-full h-8 w-8 bg-white/80 hover:bg-white"
        >
          ⟲
        </Button>
      </div>
      
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={isDragging ? 'cursor-grabbing' : 'cursor-grab'}
      >
        <g transform={`translate(${pan.x + 400}, ${pan.y + 100}) scale(${scale})`}>
          {renderNode(treeData)}
        </g>
      </svg>
    </div>
  );
}