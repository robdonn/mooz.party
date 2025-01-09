import React from 'react';
import { usePartyMembers } from '../hooks/usePartyMembers';
import { PartyMember } from './PartyMember';
import { PresetMember } from '../types/Member';
import { User } from './User';
import { useLayout } from '../hooks/useLayout';
import { cn } from '../lib/utils';

export const Chat: React.FC = () => {
  const { partyMembers } = usePartyMembers();
  const { layout } = useLayout();

  const partySize = partyMembers.length;

  const gridClasses = [
    'grid-cols-1',
    'grid-cols-1 md:grid-cols-2',
    'grid-cols-2',
    layout === 'focused' ? 'grid-cols-3' : 'grid-cols-2',
  ];
  const colSpanOptions = [
    'col-span-1',
    'col-span-1',
    'col-span-2',
    'col-span-3',
  ];
  const colSpan =
    layout === 'focused' ? colSpanOptions[partyMembers.length] : 'col-span-1';

  const ulClasses = cn(
    'flex-grow',
    'p-4',
    'grid',
    'gap-2',
    gridClasses[partySize]
  );
  const liClasses = cn('relative');
  const containerOuterClasses = cn(
    'absolute top-[50%]',
    'left-[50%]',
    'translate-x-[-50%]',
    'translate-y-[-50%]',
    'w-full',
    'h-auto',
    'aspect-[16/9]',
    'portrait:aspect-[9/16]',
    'max-w-[100%]',
    'max-h-[100%]',
    'flex',
    'justify-center',
    'items-center'
  );
  const containerInnerClasses = cn(
    'aspect-[16/9]',
    'portrait:aspect-[9/16]',
    'h-[100%]'
  );

  return (
    <ul className={ulClasses}>
      <li className={cn(liClasses, colSpan)}>
        <div className={containerOuterClasses}>
          <div className={containerInnerClasses}>
            <User />
          </div>
        </div>
      </li>
      {partyMembers.map(({ id, type }) => (
        <li className={liClasses}>
          <div className={containerOuterClasses}>
            <div className={containerInnerClasses}>
              <PartyMember key={id} id={id} type={type} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
