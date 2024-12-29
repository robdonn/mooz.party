import React from 'react';
import { X } from 'lucide-react';
import { usePartyMembers } from '../hooks/usePartyMembers';
import { AddMember } from './AddMember';
import { Button } from './ui/button';

export const Chat = () => {
  const { partyMembers, removeMember } = usePartyMembers();

  // flex layout with tailwind css with a floating button centered at the bottom
  // and the primary content is an unordered list of part members
  // with a video element for each member
  // the video element is a placeholder for now
  // the video element should be proper aspect ratio and should fit in the screen with reasonable space if there is just one video

  return (
    <div className="flex flex-col items-center justify-center h-full flex-grow p-4">
      <ul className="flex-grow w-svw flex flex-col gap-4 items-center justify-center">
        <li className="video bg-red-300 text-center aspect-video min-h-40 max-h-60">
          User
        </li>
        {partyMembers.map((member: string) => (
          <li
            key={member}
            className="video bg-red-300 text-center aspect-video min-h-40 max-h-60 flex flex-col items-center"
          >
            {member}
            <Button
              onClick={() => removeMember(member)}
              variant="default"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full"
            >
              <X />
            </Button>
          </li>
        ))}
      </ul>
      <AddMember />
    </div>
  );

  // return (
  //   <div className="flex flex-col items-center justify-center h-full flex-grow p-4">
  //     <ul className={`grid grid-flow-col ${result} gap-4 bg-gray-200`}>
  //       <li className="video bg-red-300 text-center aspect-video">User</li>
  //       {/* {partyMembers.map((member: string) => (
  //           <li
  //             key={member}
  //             className="video bg-red-300 text-center aspect-video"
  //           >
  //             {member}
  //           </li>
  //         ))} */}
  //     </ul>
  //     <AddMember />
  //   </div>
  // );
};
