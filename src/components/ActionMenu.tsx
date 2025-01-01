import React from 'react';
import { LayoutPanelTop, LayoutGrid, Video, VideoOff } from 'lucide-react';
import { Button } from './ui/button';
import { AddMember } from './AddMember';
import { Settings } from './Settings';
import { useWebcam } from '../hooks/useWebcam';
import { useLayout } from '../hooks/useLayout';
import { Donate } from './Donate';

export const ActionMenu: React.FC = () => {
  const { webcamOn, setWebcamOn } = useWebcam();
  const { layout, setLayout } = useLayout();

  return (
    <footer className="bg-gray-800 text-white p-4 fixed bottom-0 left-0 right-0 z-10 flex items-center justify-evenly">
      <Button
        variant="default"
        className={`inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-300`}
        onClick={() =>
          setLayout((layout) => (layout === 'grid' ? 'focused' : 'grid'))
        }
      >
        {layout === 'focused' ? <LayoutGrid /> : <LayoutPanelTop />}
      </Button>
      <Button
        variant="default"
        className={`inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-300 ${
          webcamOn ? 'bg-red-600' : ''
        }`}
        onClick={() => setWebcamOn(!webcamOn)}
        disabled={!navigator.mediaDevices}
      >
        {webcamOn ? <VideoOff /> : <Video />}
      </Button>
      <AddMember />
      <Settings />
      <Donate />
    </footer>
  );
};
