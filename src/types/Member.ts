export type PresetMember = {
  id: string;
  type: 'preset';
  name: string;
  avatar: string;
};

export type CustomMember = {
  id: string;
  type: 'custom';
  name: string;
  avatar: Blob;
};

export type Member = PresetMember | CustomMember;

export type MemberEntry = Pick<Member, 'id' | 'type'>;
