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
    <div className="col-span-1 aspect-video rounded-md flex items-center justify-center relative border-2 border-slate-400">
      <img
        src={`/static/avatars/${avatar?.avatar}.webp`}
        className="video text-center aspect-video object-cover"
      />
      <Button
        onClick={() => removeMember(id)}
        variant="secondary"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full absolute bottom-[-1rem] right-1 border-2 border-slate-400"
      >
        <X />
      </Button>
    </div>
  );
};
