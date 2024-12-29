import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { usePartyMembers } from '../hooks/usePartyMembers';
import { PresetMember } from '../types/Member';

import { avatars } from '../data/avatars';

export const PartyMember: React.FC<{ id: PresetMember['id'] }> = ({ id }) => {
  const { removeMember } = usePartyMembers();

  const avatar = avatars.find((avatar) => avatar.id === id);

  return (
    <div className="flex flex-col items-center relative">
      <img
        src={`/static/avatars/${avatar?.avatar}.jpg`}
        className="video bg-red-300 text-center aspect-square min-h-60 max-h-60 object-cover"
      />
      <Button
        onClick={() => removeMember(id)}
        variant="secondary"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full absolute bottom-4"
      >
        <X />
      </Button>
    </div>
  );
};
