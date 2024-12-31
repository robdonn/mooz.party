import React from 'react';
import { Video } from 'lucide-react';
import { Button } from './ui/button';
import { useWebcam } from '../hooks/useWebcam';
import { usePartyMembers } from '../hooks/usePartyMembers';
import { useLayout } from '../hooks/useLayout';

export const User: React.FC = () => {
  const { webcamOn, setWebcamOn } = useWebcam();
  const webcamRef = React.useRef<HTMLVideoElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const { partyMembers } = usePartyMembers();
  const { layout } = useLayout();

  const colSpanOptions = [
    'col-span-1',
    'col-span-1',
    'col-span-2',
    'col-span-3',
  ];

  const colSpan =
    layout === 'focused' ? colSpanOptions[partyMembers.length] : 'col-span-1';

  React.useEffect(() => {
    if (webcamOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (webcamRef.current) {
            webcamRef.current.srcObject = stream;
          }

          streamRef.current = stream;
        })
        .catch((error) => {
          console.error('Error accessing webcam:', error);
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    }
  }, [webcamOn]);

  if (webcamOn) {
    return (
      <div
        className={`${colSpan} aspect-video rounded-md overflow-hidden flex items-center justify-center border-2 border-slate-400`}
      >
        <video
          ref={webcamRef}
          className="object-cover aspect-video scale-x-[-1]"
          autoPlay
          muted
          playsInline
        />
      </div>
    );
  }

  return (
    <div
      className={`${colSpan} aspect-video bg-transparent rounded-md overflow-hidden flex items-center justify-center border-2 border-slate-400`}
    >
      <Button
        type="button"
        variant="secondary"
        onClick={() => setWebcamOn(!webcamOn)}
        className="w-16 h-16 rounded-full border-2 border-slate-800 "
      >
        <Video />
      </Button>
    </div>
  );
};
