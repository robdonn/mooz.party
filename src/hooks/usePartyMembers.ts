import React from 'react';

export const storageKey = 'mooz-party-members';

export const usePartyMembers = () => {
  // This is a custom hook that returns an array of party members
  // The members are from a list of preset user profiles
  // The list is kept in the local storage

  // Get the party members from the local storage
  const readMembers = () => {
    const raw = localStorage.getItem(storageKey);

    if (!raw) {
      localStorage.setItem(storageKey, JSON.stringify([]));
    }

    const partyMembers = JSON.parse(raw || '[]');

    return partyMembers;
  };

  const [partyMembers, setPartyMembers] = React.useState(readMembers());

  // Also returns functions to add or remove members
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

  return { partyMembers, addMember, removeMember };
};
