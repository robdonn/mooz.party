import React from 'react';

const storageKey = 'mooz-party-members';

const usePartyMembers = () => {
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

export const Chat = () => {
  const { partyMembers, addMember, removeMember } = usePartyMembers();

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const input = document.querySelector('input');
    if (input) {
      addMember(input.value);
      input.value = '';
    }
  };

  const formDisabled = partyMembers.length >= 3;

  return (
    <div>
      <ul>
        <li>User</li>
        {partyMembers.map((member: string) => (
          <li key={member}>
            {member}
            <button onClick={() => removeMember(member)}>Remove</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddUser}>
        <select disabled={formDisabled}>
          <option value="preset">Preset</option>
          <option value="custom">Custom</option>
        </select>
        <input type="text" disabled={formDisabled} />
        <button type="submit" disabled={formDisabled}>
          Add
        </button>
      </form>
    </div>
  );
};
