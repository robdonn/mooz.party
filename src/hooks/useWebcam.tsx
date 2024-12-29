import React from 'react';

export const WebcamContext = React.createContext<{
  webcamOn: boolean;
  setWebcamOn: (arg: any) => void;
} | null>(null);

export const WebcamProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [webcamOn, setWebcamOn] = React.useState(false);

  return (
    <WebcamContext.Provider value={{ webcamOn, setWebcamOn }}>
      {children}
    </WebcamContext.Provider>
  );
};

export const useWebcam = () => {
  const context = React.useContext(WebcamContext);

  if (!context) {
    throw new Error('useWebcam must be used within a WebcamProvider');
  }

  return context;
};
