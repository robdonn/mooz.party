import React from 'react';

export const storageKey = 'mooz-party-members';

type PartyMembersContextType = {
  partyMembers: string[];
  addMember: (member: string) => void;
  removeMember: (member: string) => void;
};

export const PartyMembersContext =
  React.createContext<PartyMembersContextType | null>(null);

export const PartyMembersProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const readMembers = () => {
    const raw = localStorage.getItem(storageKey);

    if (!raw) {
      localStorage.setItem(storageKey, JSON.stringify([]));
    }

    const partyMembers = JSON.parse(raw || '[]');

    return partyMembers;
  };

  const [partyMembers, setPartyMembers] = React.useState(readMembers());

  const addMember = (member: string) => {
    localStorage.setItem(storageKey, JSON.stringify([...partyMembers, member]));
    setPartyMembers(readMembers());
  };

  const removeMember = (member: string) => {
    localStorage.setItem(
      storageKey,
      JSON.stringify(partyMembers.filter((m: string) => m !== member))
    );
    setPartyMembers(readMembers());
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
