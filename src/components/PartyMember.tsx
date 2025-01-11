import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { usePartyMembers } from '../hooks/usePartyMembers';
import { MemberEntry, PresetMember } from '../types/Member';

import { avatars } from '../data/avatars';
import { useCustomMember } from '../hooks/db';

export const PartyMember: React.FC<MemberEntry> = ({ id, type }) => {
  const { removeMember } = usePartyMembers();
  const [src, setSrc] = React.useState<string | undefined>();
  const { data: customMember } = useCustomMember(id, type === 'custom');

  React.useEffect(() => {
    if (type === 'preset') {
      const preset = avatars.find((avatar) => avatar.id === id) as PresetMember;
      setSrc(`/static/avatars/${preset.avatar}.jpg`);
    }

    if (customMember) {
      setSrc(URL.createObjectURL(customMember.avatar));
    }
  }, [customMember]);

  return (
    <div className="col-span-1 aspect-[16/9] portrait:aspect-[9/16] rounded-md flex items-center justify-center relative border-2 border-slate-400">
      <img
        src={src}
        className="video text-center aspect-[16/9] portrait:aspect-[9/16] object-cover object-avatar h-full w-full"
      />
      <Button
        onClick={() => removeMember({ id, type: 'preset' })}
        variant="secondary"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full absolute bottom-[-1rem] right-1 border-2 border-slate-400"
      >
        <X />
      </Button>
    </div>
  );
};
