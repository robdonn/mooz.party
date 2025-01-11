import React from 'react';
import { MemberEntry } from '../types/Member';
import { useAddMembers, useParty, useRemoveMember } from './db';

export const storageKey = 'mooz-party-members';

type PartyMembersContextType = {
  partyId: string;
  partyMembers: MemberEntry[];
  addMember: (members: MemberEntry[]) => void;
  removeMember: (member: MemberEntry) => void;
};

export const PartyMembersContext =
  React.createContext<PartyMembersContextType | null>(null);

export const PartyMembersProvider: React.FC<
  React.PropsWithChildren<{ id: string }>
> = ({ id, children }) => {
  const { data: party } = useParty({ partyId: id });
  const { mutate: addMembersFn } = useAddMembers();
  const { mutate: removeMemberFn } = useRemoveMember();

  const addMember = (members: MemberEntry[]) =>
    addMembersFn({ partyId: id, members });

  const removeMember = (member: MemberEntry) =>
    removeMemberFn({ partyId: id, memberId: member.id });

  return (
    <PartyMembersContext.Provider
      value={{
        partyId: id,
        partyMembers: party?.members || [],
        addMember,
        removeMember,
      }}
    >
      {children}
    </PartyMembersContext.Provider>
  );
};

export const usePartyMembers = () => {
  const context = React.useContext(PartyMembersContext);

  if (!context) {
    throw new Error(
      'usePartyMembers must be used within a PartyMembersProvider'
    );
  }

  return context;
};
