import React from 'react';
import {
  addMembers,
  readFirstParty,
  removeMember as removeMemberFromDB,
} from '../data/db';
import { MemberEntry } from '../types/Member';

export const storageKey = 'mooz-party-members';

type PartyMembersContextType = {
  partyMembers: MemberEntry[];
  addMember: (members: MemberEntry[]) => void;
  removeMember: (member: MemberEntry) => void;
};

export const PartyMembersContext =
  React.createContext<PartyMembersContextType | null>(null);

export const PartyMembersProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [partyId, setPartyId] = React.useState<string | null>(null);
  const readMembers = async () => {
    const party = await readFirstParty();

    if (!party) {
      throw new Error('No party found');
    }

    if (party.id !== partyId) {
      setPartyId(party.id);
    }

    return party.members;
  };

  const [partyMembers, setPartyMembers] = React.useState([]);

  React.useEffect(() => {
    readMembers().then(setPartyMembers);
  }, []);

  const addMember: PartyMembersContextType['addMember'] = async (members) => {
    await addMembers(partyId as string, members);

    readMembers().then(setPartyMembers);
  };

  const removeMember: PartyMembersContextType['removeMember'] = async (
    member
  ) => {
    await removeMemberFromDB(partyId as string, member.id);

    readMembers().then(setPartyMembers);
  };

  return (
    <PartyMembersContext.Provider
      value={{ partyMembers, addMember, removeMember }}
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
