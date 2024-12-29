import React from 'react';
import { Video } from 'lucide-react';
import { Button } from './ui/button';

export const User: React.FC<{
  webcamOn: boolean;
  setWebcamOn: (arg: any) => void;
}> = ({ webcamOn, setWebcamOn }) => {
  // If webcamOn is false, show placeholder with button to enable webcam
  // Otherwise, show webcam feed

  const webcamRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (webcamOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (webcamRef.current) {
            webcamRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error('Error accessing webcam:', error);
        });
    }
  }, [webcamOn]);

  if (webcamOn) {
    return (
      <div className="aspect-w-16 aspect-h-9  rounded-md overflow-hidden flex items-center justify-center">
        <video
          ref={webcamRef}
          className="object-cover aspect-video"
          autoPlay
          muted
        />
      </div>
    );
  }

  return (
    <div className="aspect-w-16 aspect-h-9 bg-transparent rounded-md overflow-hidden flex items-center justify-center">
      <Button
        type="button"
        variant="secondary"
        onClick={() => setWebcamOn(!webcamOn)}
        className="w-16 h-16 rounded-full border-2 border-slate-800"
      >
        <Video />
      </Button>
    </div>
  );
};
