import React from 'react';
import { Video } from 'lucide-react';
import { Button } from './ui/button';
import { useWebcam } from '../hooks/useWebcam';

export const User: React.FC = () => {
  const { webcamOn, setWebcamOn } = useWebcam();
  const webcamRef = React.useRef<HTMLVideoElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

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
      <div className="aspect-w-16 aspect-h-9 portrait:aspect-w-9 portrait:aspect-h-16 rounded-md overflow-hidden flex items-center justify-center">
        <video
          ref={webcamRef}
          className="object-cover aspect-video"
          autoPlay
          muted
          playsInline
        />
      </div>
    );
  }

  return (
    <div className="aspect-w-16 aspect-h-9 portrait:aspect-w-9 portrait:aspect-h-16 bg-transparent rounded-md overflow-hidden flex items-center justify-center">
      <Button
        type="button"
        variant="secondary"
        onClick={() => setWebcamOn(!webcamOn)}
        className="w-16 h-16 portrait:w-16 portrait:h-16 rounded-full border-2 border-slate-800"
      >
        <Video />
      </Button>
    </div>
  );
};
