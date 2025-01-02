import React from 'react';
import { Plus, PlusIcon } from 'lucide-react';
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
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export const AddMember: React.FC<{ uploadCallback: () => void }> = ({
  uploadCallback,
}) => {
  const { partyMembers, addMember } = usePartyMembers();
  const [open, setOpen] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState<
    PresetMember['id'][]
  >([]);

  const [showTooltip, setShowTooltip] = React.useState(false);
  const showTooltipDelay = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (showTooltipDelay.current) clearTimeout(showTooltipDelay.current);

    if (!partyMembers.length && !open) {
      showTooltipDelay.current = setTimeout(() => {
        setShowTooltip(true);
      }, 2000);
    }

    return () => {
      if (showTooltipDelay.current) clearTimeout(showTooltipDelay.current);
    };
  }, [open, partyMembers.length]);

  const submitDisabled = !selectedMember.length;
  const maxSelected = partyMembers.length >= 3;
  const totalSelected = selectedMember.length + partyMembers.length;

  const handleSubmit = () => {
    if (selectedMember.length) {
      addMember(selectedMember.map((id) => ({ id, type: 'preset' })));

      setOpen(false);
      setSelectedMember([]);
    }
  };

  return (
    <div>
      <Tooltip open={showTooltip}>
        <TooltipTrigger asChild>
          <Button
            variant="default"
            className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-300"
            onClick={() => {
              if (showTooltip) {
                setShowTooltip(false);
              }

              setOpen(true);
            }}
            disabled={maxSelected}
          >
            <Plus />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={20}>
          Add a party member
        </TooltipContent>
      </Tooltip>

      <Drawer open={open} onClose={() => setOpen(false)}>
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
                  const currentSelected = selectedMember.includes(id);
                  const alreadySelected = partyMembers.find(
                    (partyMember) => partyMember.id === id
                  );

                  return (
                    <li key={id} className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() =>
                          setSelectedMember((selected) => {
                            if (currentSelected) {
                              return selected.filter((s) => s !== id);
                            }

                            if (totalSelected >= 3) {
                              return selected;
                            }

                            return [...selected, id];
                          })
                        }
                        className="h-16 w-16 rounded-full"
                        disabled={!!alreadySelected}
                      >
                        <Avatar
                          className={`h-16 w-16 border-2 ${
                            currentSelected
                              ? 'border-cyan-400'
                              : 'border-transparent'
                          } `}
                        >
                          <AvatarImage
                            src={`/static/avatars/${avatar}.webp`}
                            className="object-cover"
                          />
                          <AvatarFallback>{name}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </li>
                  );
                })}
                <li className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setSelectedMember([]);
                      uploadCallback();
                    }}
                    className="h-16 w-16 rounded-full"
                  >
                    <Avatar className="h-16 w-16 border-2 border-transparent">
                      <AvatarFallback>
                        <PlusIcon />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </li>
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
