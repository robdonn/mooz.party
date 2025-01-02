import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { usePartyMembers } from '../hooks/usePartyMembers';
import { MemberEntry, PresetMember } from '../types/Member';

import { avatars } from '../data/avatars';
import { readCustomMember } from '../data/db';

export const PartyMember: React.FC<MemberEntry> = ({ id, type }) => {
  const { removeMember } = usePartyMembers();
  const [src, setSrc] = React.useState<string | undefined>();

  const getImageSrc = async () => {
    if (type === 'preset') {
      const preset = avatars.find((avatar) => avatar.id === id) as PresetMember;
      return `/static/avatars/${preset.avatar}.webp`;
    }

    const { avatar } = await readCustomMember(id);

    console.log(avatar);

    return URL.createObjectURL(avatar);
  };

  React.useEffect(() => {
    getImageSrc().then(setSrc);
  }, []);

  return (
    <div className="col-span-1 aspect-video rounded-md flex items-center justify-center relative border-2 border-slate-400">
      <img
        src={src}
        className="video text-center aspect-video object-cover h-full w-full"
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
