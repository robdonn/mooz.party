import React from 'react';
import { Video } from 'lucide-react';
import { Button } from './ui/button';

export const User: React.FC<{
  webcamOn: boolean;
  setWebcamOn: (arg: any) => void;
}> = ({ webcamOn, setWebcamOn }) => {
  // If webcamOn is false, show placeholder with button to enable webcam
  // Otherwise, show webcam feed

  React.useEffect(() => {
    if (webcamOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          const video = document.querySelector('video');
          if (video) {
            video.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error('Error accessing webcam:', error);
        });
    }
  }, [webcamOn]);

  if (webcamOn) {
    return (
      <div className="video bg-slate-700 flex justify-center items-center aspect-square min-h-60 max-h-60">
        <video className="w-60 h-60 object-cover" autoPlay muted />
      </div>
    );
  }

  return (
    <div className="video bg-slate-700 flex justify-center items-center aspect-square min-h-60 max-h-60">
      <Button
        type="button"
        variant="secondary"
        onClick={() => setWebcamOn(!webcamOn)}
      >
        <Video />
      </Button>
    </div>
  );
};
