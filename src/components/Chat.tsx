import React from 'react';
import { usePartyMembers } from '../hooks/usePartyMembers';
import { PartyMember } from './PartyMember';
import { PresetMember } from '../types/Member';
import { User } from './User';
import { useLayout } from '../hooks/useLayout';

export const Chat: React.FC = () => {
  const { partyMembers } = usePartyMembers();
  const { layout } = useLayout();

  const partySize = partyMembers.length;

  const gridClasses = [
    'grid-cols-1',
    'grid-cols-1 md:grid-cols-2',
    'grid-cols-2',
    layout === 'focused' ? 'grid-cols-3' : 'grid-cols-2',
  ];

  return (
    <div className="h-full flex items-center justify-center">
      <div
        className={`grid gap-4 p-4 w-full max-w-5xl mx-auto ${gridClasses[partySize]}`}
      >
        <User />
        {partyMembers.map((id: PresetMember['id']) => (
          <PartyMember key={id} id={id} />
        ))}
      </div>
    </div>
  );
};
