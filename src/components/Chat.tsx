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

  return (
    <ul className="flex flex-col gap-4 items-center justify-center p-4">
      <li>
        <User webcamOn={webcamOn} setWebcamOn={setWebcamOn} />
      </li>
      {partyMembers.map((member: PresetMember['id']) => (
        <li key={member}>
          <PartyMember id={member} />
        </li>
      ))}
    </ul>
  );
};
