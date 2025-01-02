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

const generateId = () => {
  const length = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
};

const saveToIndexedDB = async (file: File, name: string) => {
  const { openDB } = await import('idb');

  const id = generateId();

  // Convert the file into a Blob (if needed, it's already a Blob)
  const imageBlob = new Blob([file], { type: file.type });

  // Open IndexedDB or create if it doesn't exist
  const db = await openDB('Mooz Party', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('Custom Members')) {
        db.createObjectStore('Custom Members', { keyPath: 'id' });
      }
    },
  });

  // Save to IndexedDB
  await db.add('Custom Members', {
    id,
    name,
    file: imageBlob,
  });

  return id;
};

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

              const id = await saveToIndexedDB(file.current, name);

              addMember([id]);

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
