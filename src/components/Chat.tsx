import React from 'react';
import { usePartyMembers } from '@/hooks/usePartyMembers';

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
