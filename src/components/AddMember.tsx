import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';
import { usePartyMembers } from '../hooks/usePartyMembers';

import { avatars } from '../data/avatars';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { PresetMember } from '../types/Member';

export const AddMember = () => {
  const { partyMembers, addMember } = usePartyMembers();
  const [open, setOpen] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState<
    PresetMember['id'] | null
  >(null);

  const submitDisabled = !selectedMember;
  const maxSelected = partyMembers.length >= 3;

  const handleSubmit = () => {
    if (selectedMember) {
      addMember(selectedMember);
      setOpen(false);
      setSelectedMember(null);
    }
  };

  return (
    <div>
      <Button
        variant="default"
        className="inline-flex h-16 w-16 items-center justify-center rounded-full"
        onClick={() => setOpen(true)}
        disabled={maxSelected}
      >
        <Plus />
      </Button>
      <Drawer open={open}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Add Party Member</DrawerTitle>
              <DrawerDescription>
                Add a preset member or upload your own.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0 flex justify-center">
              <ul className="grid grid-cols-2 gap-4">
                {avatars.map(({ avatar, id, name }) => {
                  const currentSelected = selectedMember === id;
                  const alreadySelected = partyMembers.includes(id);

                  return (
                    <li key={id} className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => setSelectedMember(id)}
                        className="h-16 w-16"
                        disabled={alreadySelected}
                      >
                        <Avatar
                          className={`h-16 w-16 border-2 ${
                            currentSelected
                              ? 'border-cyan-400'
                              : 'border-transparent'
                          } `}
                        >
                          <AvatarImage src={`/static/avatars/${avatar}.jpg`} />
                          <AvatarFallback>{name}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <DrawerFooter>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={submitDisabled}
              >
                Add member
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
