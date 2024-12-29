import React from 'react';
import { Video, VideoOff } from 'lucide-react';
import { Button } from './ui/button';
import { AddMember } from './AddMember';
import { Settings } from './Settings';
import { useWebcam } from '../hooks/useWebcam';

export const ActionMenu: React.FC = () => {
  const { webcamOn, setWebcamOn } = useWebcam();

  return (
    <footer className="bg-gray-800 text-white p-4 fixed bottom-0 left-0 right-0 z-10 flex items-center justify-evenly">
      <Button
        variant="default"
        className={`inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-300 ${
          webcamOn ? 'bg-red-600' : ''
        }`}
        onClick={() => setWebcamOn(!webcamOn)}
      >
        {webcamOn ? <VideoOff /> : <Video />}
      </Button>
      <AddMember />
      <Settings />
    </footer>
  );
};
