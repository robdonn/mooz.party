import React from 'react';
import { usePartyMembers } from '../hooks/usePartyMembers';
import { PartyMember } from './PartyMember';
import { PresetMember } from '../types/Member';

export const Chat = () => {
  const { partyMembers, removeMember } = usePartyMembers();

  return (
    <ul className="flex flex-col gap-4 items-center justify-center p-4">
      <li className="video bg-red-300 text-center aspect-video min-h-40 max-h-60">
        User
      </li>
      {partyMembers.map((member: PresetMember['id']) => (
        <li key={member}>
          <PartyMember id={member} />
        </li>
      ))}
    </ul>
  );
};
