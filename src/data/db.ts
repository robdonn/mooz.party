import { openDB, type IDBPDatabase } from 'idb';
import { generateId } from '../lib/utils/generateId';
import { CustomMember, Member } from '../types/Member';

const DB_VERSION = 2;

type DatabaseSchema = {
  'Custom Members': {
    key: string;
    value: Omit<CustomMember, 'type'>;
  };
  Parties: {
    key: string;
    value: {
      id: string;
      name: string;
      members: Pick<Member, 'id' | 'type'>[];
    };
  };
  Settings: {
    key: 'showWelcomeMessage' | 'allowCustomMembers';
    value: {
      id: 'showWelcomeMessage' | 'allowCustomMembers';
      value: boolean;
    };
  };
};

class DB {
  private db: IDBPDatabase<DatabaseSchema>;

  constructor() {
    this.db = null as unknown as IDBPDatabase<DatabaseSchema>;
  }

  init = async () => {
    const db = await openDB<DatabaseSchema>('Mooz Party', DB_VERSION, {
      upgrade(db) {
        console.log(`Upgrading database to version ${DB_VERSION}`);

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

    this.db = db;
  };

  seedSettingsIfNotSet = async () => {
    const showWelcomeMessage = await this.db.get(
      'Settings',
      'showWelcomeMessage'
    );
    const allowCustomMembers = await this.db.get(
      'Settings',
      'allowCustomMembers'
    );

    if (!showWelcomeMessage) {
      await this.db.add('Settings', {
        id: 'showWelcomeMessage',
        value: true,
      });
    }

    if (!allowCustomMembers) {
      await this.db.add('Settings', {
        id: 'allowCustomMembers',
        value: true,
      });
    }
  };

  addNewCustomMember = async ({ file, name }: { file: File; name: string }) => {
    const id = generateId();

    // Convert the file into a Blob (if needed, it's already a Blob)
    const imageBlob = new Blob([file], { type: file.type });

    const customMember: Omit<CustomMember, 'type'> = {
      id,
      name,
      avatar: imageBlob,
    };

    // Save to IndexedDB
    await this.db.add('Custom Members', customMember);

    return id;
  };

  // Read all custom members from IndexedDB
  readCustomMembers = async (): Promise<Omit<CustomMember, 'type'>[]> => {
    // Read from IndexedDB
    return this.db.getAll('Custom Members');
  };

  // Read custom member from IndexedDB with the given id
  readCustomMember = async ({
    id,
  }: {
    id: string;
  }): Promise<Omit<CustomMember, 'type'> | undefined> => {
    // Read from IndexedDB
    return this.db.get('Custom Members', id);
  };

  // Remove custom member from IndexedDB with the given id
  removeCustomMember = async (id: string) => {
    // Remove from IndexedDB
    await this.db.delete('Custom Members', id);
  };

  // Create party with an id, optional name and can contain up to 3 members made up of an id and member type, being custom or preset
  createParty = async (
    id: string,
    name: string = '',
    members: Pick<Member, 'id' | 'type'>[] = []
  ) => {
    // Save to IndexedDB
    await this.db.add('Parties', {
      id,
      name,
      members,
    });
  };

  readParty = async ({ partyId }: { partyId: string }) => {
    // Read from IndexedDB
    return this.db.get('Parties', partyId);
  };

  readParties = async () => {
    // Read from IndexedDB
    return this.db.getAll('Parties');
  };

  readFirstParty = async () => {
    const parties = await this.readParties();

    return parties[0];
  };

  addMember = async ({
    partyId,
    member,
  }: {
    partyId: string;
    member: Pick<Member, 'id' | 'type'>;
  }) => {
    // Get the party
    const party = await this.db.get('Parties', partyId);

    if (!party) {
      return;
    }

    // Add the member
    party.members.push(member);

    // Update the party
    await this.db.put('Parties', party);
  };

  addMembers = async ({
    partyId,
    members,
  }: {
    partyId: string;
    members: Pick<Member, 'id' | 'type'>[];
  }) => {
    // Get the party
    const party = await this.db.get('Parties', partyId);

    if (!party) {
      return;
    }

    // Add the members
    party.members.push(...members);

    // Update the party
    await this.db.put('Parties', party);
  };

  // Remove member from the party with the given id
  removeMember = async ({
    partyId,
    memberId,
  }: {
    partyId: string;
    memberId: string;
  }) => {
    // Get the party
    const party = await this.db.get('Parties', partyId);

    if (!party) {
      return;
    }

    // Remove the member
    party.members = party.members.filter(
      (member: Pick<Member, 'id' | 'type'>) => member.id !== memberId
    );

    // Update the party
    await this.db.put('Parties', party);
  };

  saveShowWelcomeMessage = async ({ show }: { show: boolean }) => {
    await this.db.put('Settings', {
      id: 'showWelcomeMessage',
      value: show,
    });
  };

  readShowWelcomeMessage = async () => {
    const showWelcomeMessage = await this.db.get(
      'Settings',
      'showWelcomeMessage'
    );

    return showWelcomeMessage?.value ?? true;
  };
}

export const db = new DB();
