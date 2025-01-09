import { openDB } from 'idb';
import { generateId } from '../lib/utils/generateId';
import { CustomMember, Member } from '../types/Member';

// Init database with stores
export const initDB = async () => {
  // Open IndexedDB or create if it doesn't exist
  const db = await openDB('Mooz Party', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('Custom Members')) {
        db.createObjectStore('Custom Members', { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains('Parties')) {
        db.createObjectStore('Parties', { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains('Settings')) {
        db.createObjectStore('Settings', { keyPath: 'id' });
      }
    },
  });

  return db;
};

export const addNewCustomMeber = async (file: File, name: string) => {
  const id = generateId();

  // Convert the file into a Blob (if needed, it's already a Blob)
  const imageBlob = new Blob([file], { type: file.type });

  // Open IndexedDB or create if it doesn't exist
  const db = await openDB('Mooz Party', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('Custom Members')) {
        db.createObjectStore('Custom Members', { keyPath: 'id' });
      }
    },
  });

  const customMember: Omit<CustomMember, 'type'> = {
    id,
    name,
    avatar: imageBlob,
  };

  // Save to IndexedDB
  await db.add('Custom Members', customMember);

  return id;
};

// Read all custom members from IndexedDB
export const readCustomMembers = async (): Promise<
  Omit<CustomMember, 'type'>[]
> => {
  // Open IndexedDB or create if it doesn't exist
  const db = await openDB('Mooz Party', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('Custom Members')) {
        db.createObjectStore('Custom Members', { keyPath: 'id' });
      }
    },
  });

  // Read from IndexedDB
  return db.getAll('Custom Members');
};

// Read custom member from IndexedDB with the given id
export const readCustomMember = async (
  id: string
): Promise<Omit<CustomMember, 'type'>> => {
  // Open IndexedDB or create if it doesn't exist
  const db = await openDB('Mooz Party', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('Custom Members')) {
        db.createObjectStore('Custom Members', { keyPath: 'id' });
      }
    },
  });

  // Read from IndexedDB
  return db.get('Custom Members', id);
};

// Remove custom member from IndexedDB with the given id
export const removeCustomMember = async (id: string) => {
  // Open IndexedDB or create if it doesn't exist
  const db = await openDB('Mooz Party', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('Custom Members')) {
        db.createObjectStore('Custom Members', { keyPath: 'id' });
      }
    },
  });

  // Remove from IndexedDB
  await db.delete('Custom Members', id);
};

// Create party with an id, optional name and can contain up to 3 members made up of an id and member type, being custom or preset
export const createParty = async (
  id: string,
  name: string = '',
  members: Pick<Member, 'id' | 'type'>[] = []
) => {
  // Open IndexedDB or create if it doesn't exist
  const db = await openDB('Mooz Party', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('Parties')) {
        db.createObjectStore('Parties', { keyPath: 'id' });
      }
    },
  });

  // Save to IndexedDB
  await db.add('Parties', {
    id,
    name,
    members,
  });
};

// Read the first party from IndexedDB or create a new one if it doesn't exist
export const readParty = async (partyId: string) => {
  // Open IndexedDB or create if it doesn't exist
  const db = await openDB('Mooz Party', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('Parties')) {
        db.createObjectStore('Parties', { keyPath: 'id' });
      }
    },
  });

  // Read from IndexedDB
  return db.get('Parties', partyId);
};

// Read all parties from IndexedDB
export const readParties = async () => {
  // Open IndexedDB or create if it doesn't exist
  const db = await openDB('Mooz Party', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('Parties')) {
        db.createObjectStore('Parties', { keyPath: 'id' });
      }
    },
  });

  // Read from IndexedDB
  return db.getAll('Parties');
};

// Read first party
export const readFirstParty = async () => {
  const parties = await readParties();

  return parties[0];
};

// Add member to the party with the given id
export const addMember = async (
  partyId: string,
  member: Pick<Member, 'id' | 'type'>
) => {
  // Open IndexedDB or create if it doesn't exist
  const db = await openDB('Mooz Party', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('Parties')) {
        db.createObjectStore('Parties', { keyPath: 'id' });
      }
    },
  });

  // Get the party
  const party = await db.get('Parties', partyId);

  // Add the member
  party.members.push(member);

  // Update the party
  await db.put('Parties', party);
};

// Add multiple members to the party with the given id
export const addMembers = async (
  partyId: string,
  newMembers: Pick<Member, 'id' | 'type'>[]
) => {
  // Open IndexedDB or create if it doesn't exist
  const db = await openDB('Mooz Party', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('Parties')) {
        db.createObjectStore('Parties', { keyPath: 'id' });
      }
    },
  });

  // Get the party
  const party = await db.get('Parties', partyId);

  // Add the members
  party.members.push(...newMembers);

  // Update the party
  await db.put('Parties', party);
};

// Remove member from the party with the given id
export const removeMember = async (partyId: string, memberId: string) => {
  // Open IndexedDB or create if it doesn't exist
  const db = await openDB('Mooz Party', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('Parties')) {
        db.createObjectStore('Parties', { keyPath: 'id' });
      }
    },
  });

  // Get the party
  const party = await db.get('Parties', partyId);

  // Remove the member
  party.members = party.members.filter(
    (member: Pick<Member, 'id' | 'type'>) => member.id !== memberId
  );

  // Update the party
  await db.put('Parties', party);
};

// Save state for hiding welcome message in local storage instead of indexeddb
export const saveWelcomeState = (hidden: boolean) => {
  localStorage.setItem('moozParty-welcomeHidden', JSON.stringify(hidden));
};

// Read state for hiding welcome message from local storage instead of indexeddb
export const readWelcomeState = () => {
  const hidden = localStorage.getItem('moozParty-welcomeHidden');

  return hidden ? JSON.parse(hidden) : false;
};
