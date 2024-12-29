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
    <div className="aspect-w-16 aspect-h-9 bg-black rounded-md overflow-hidden flex items-center justify-center relative">
      <img
        src={`/static/avatars/${avatar?.avatar}.jpg`}
        className="video text-center aspect-video object-cover"
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
