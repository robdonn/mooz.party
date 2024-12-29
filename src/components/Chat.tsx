import React from 'react';
import { X } from 'lucide-react';
import { usePartyMembers } from '../hooks/usePartyMembers';
import { Button } from './ui/button';

export const Chat = () => {
  const { partyMembers, removeMember } = usePartyMembers();

  return (
    <ul className="flex flex-col gap-4 items-center justify-center p-4">
      <li className="video bg-red-300 text-center aspect-video min-h-40 max-h-60">
        User
      </li>
      {partyMembers.map((member: string) => (
        <li
          key={member}
          className="video bg-red-300 text-center aspect-video min-h-40 max-h-60 flex flex-col items-center"
        >
          {member}
          <Button
            onClick={() => removeMember(member)}
            variant="default"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full"
          >
            <X />
          </Button>
        </li>
      ))}
    </ul>
  );
};
