import React from 'react';
import { Video, VideoOff, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { AddMember } from './AddMember';

export const ActionMenu = () => {
  return (
    <div className="border-t-2 border-gray-200 p-4 flex justify-center items-center gap-10">
      <Button
        variant="default"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full"
      >
        <Video />
      </Button>
      <AddMember />
      <Button
        variant="default"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full"
      >
        <Settings />
      </Button>
    </div>
  );
};