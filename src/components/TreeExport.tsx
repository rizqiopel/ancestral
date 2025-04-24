import { useState } from 'react';
import { FamilyMember } from '@/lib/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';

interface TreeExportProps {
  open: boolean;
  onClose: () => void;
  familyMembers: FamilyMember[];
}

export default function TreeExport({ open, onClose, familyMembers }: TreeExportProps) {
  const [exportFormat, setExportFormat] = useState<string>('json');
  
  const handleExport = () => {
    try {
      // Prepare the data for export
      const data = JSON.stringify(familyMembers, null, 2);
      
      // Create a blob with the data
      const blob = new Blob([data], { type: 'application/json' });
      
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      
      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.download = `family-tree-export-${new Date().toISOString().slice(0, 10)}.json`;
      
      // Append the link to the document
      document.body.appendChild(link);
      
      // Click the link
      link.click();
      
      // Remove the link from the document
      document.body.removeChild(link);
      
      // Revoke the URL
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Export Successful',
        description: 'Your family tree data has been exported successfully.',
      });
      
      onClose();
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'There was an error exporting your family tree data.',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-family-parchment">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-family-brown">Export Family Tree</DialogTitle>
          <DialogDescription className="font-lato">
            Export your family tree data to share with family members or backup your information.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Label className="font-playfair text-family-brown mb-3 block">Export Format</Label>
          <RadioGroup
            defaultValue={exportFormat}
            onValueChange={setExportFormat}
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-3 rounded-md border p-3 bg-white">
              <RadioGroupItem value="json" id="json" />
              <Label htmlFor="json" className="flex flex-col">
                <span className="font-semibold font-lato">JSON Format</span>
                <span className="text-sm text-muted-foreground font-lato">
                  Standard format for data exchange, easy to import back into the system.
                </span>
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-md border p-3 bg-white opacity-60">
              <RadioGroupItem value="pdf" id="pdf" disabled />
              <Label htmlFor="pdf" className="flex flex-col">
                <span className="font-semibold font-lato">PDF Document (Coming Soon)</span>
                <span className="text-sm text-muted-foreground font-lato">
                  Printable visual family tree document with member information.
                </span>
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-md border p-3 bg-white opacity-60">
              <RadioGroupItem value="gedcom" id="gedcom" disabled />
              <Label htmlFor="gedcom" className="flex flex-col">
                <span className="font-semibold font-lato">GEDCOM (Coming Soon)</span>
                <span className="text-sm text-muted-foreground font-lato">
                  Standard genealogy file format compatible with other family tree software.
                </span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="font-lato">
            Cancel
          </Button>
          <Button 
            onClick={handleExport} 
            className="bg-family-brown hover:bg-family-brown/90 font-lato"
          >
            Export Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}