import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { usePartyMembers } from '../hooks/usePartyMembers';
import { addNewCustomMeber } from '../data/db';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { ShieldCheck } from 'lucide-react';

export const Upload: React.FC<{ open: boolean; close: () => void }> = ({
  open,
  close,
}) => {
  const file = React.useRef<File | null>(null);
  const [name, setName] = React.useState('');
  const [fileSelected, setFileSelected] = React.useState(false);
  const { addMember } = usePartyMembers();

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add your own</DialogTitle>
          <DialogDescription>Upload your own party members</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Alert>
            <ShieldCheck color="green" />
            <AlertTitle>Personal Images</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside">
                <li>All images are stored locally on your device.</li>
                <li>Data is never uploaded to the internet.</li>
                <li>Do not use this feature on public devices.</li>
                <li>This feature can be turned off in the settings menu.</li>
              </ul>
            </AlertDescription>
          </Alert>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="picture">Select Image</Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  file.current = e.target.files[0];
                  setFileSelected(true);
                } else {
                  file.current = null;
                  setFileSelected(false);
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => close()}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (!file.current) return;

              const id = await addNewCustomMeber(file.current, name);

              addMember([{ id, type: 'custom' }]);

              close();
            }}
            disabled={!fileSelected || !name}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
