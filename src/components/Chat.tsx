import React from 'react';
import { usePartyMembers } from '../hooks/usePartyMembers';
import { PartyMember } from './PartyMember';
import { PresetMember } from '../types/Member';
import { User } from './User';

export const Chat: React.FC<{
  webcamOn: boolean;
  setWebcamOn: (arg: any) => void;
}> = ({ webcamOn, setWebcamOn }) => {
  const { partyMembers } = usePartyMembers();

  const partySize = partyMembers.length;

  const gridClasses = [
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-2',
    'grid-cols-2 md:grid-cols-2',
  ];

  return (
    <div className="h-full flex items-center justify-center">
      <div
        className={`grid gap-4 p-4 w-full max-w-5xl mx-auto ${gridClasses[partySize]}`}
      >
        <User webcamOn={webcamOn} setWebcamOn={setWebcamOn} />
        {partyMembers.map((id: PresetMember['id']) => (
          <PartyMember key={id} id={id} />
        ))}
      </div>
    </div>
  );
};
