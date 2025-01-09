import React from 'react';
import { Video } from 'lucide-react';
import { Button } from './ui/button';
import { useWebcam } from '../hooks/useWebcam';
import { usePartyMembers } from '../hooks/usePartyMembers';
import { useLayout } from '../hooks/useLayout';
import { cn } from '../lib/utils';

export const User: React.FC = () => {
  const { webcamOn, setWebcamOn } = useWebcam();
  const webcamRef = React.useRef<HTMLVideoElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

  const disabled = !navigator.mediaDevices;

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

  const containerClasses = cn(
    'aspect-[16/9]',
    'portrait:aspect-[9/16]',
    'rounded-md',
    'overflow-hidden',
    'flex',
    'items-center',
    'justify-center',
    'border-2',
    'border-slate-400'
  );

  if (webcamOn) {
    return (
      <div className={containerClasses}>
        <video
          ref={webcamRef}
          className="object-cover scale-x-[-1] aspect-[16/9] portrait:aspect-[9/16] w-full"
          autoPlay
          muted
          playsInline
        />
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <Button
        type="button"
        variant="secondary"
        onClick={() => setWebcamOn(!webcamOn)}
        className="w-16 h-16 rounded-full border-2 border-slate-800 "
        disabled={disabled}
      >
        <Video />
      </Button>
      {disabled && (
        <p className="text-center">
          Looks like your device is not compatible with this app
        </p>
      )}
    </div>
  );
};
