import React from 'react';
import { Chat } from './components/Chat';
import { ActionMenu } from './components/ActionMenu';
import { Header } from './components/Header';
import { PartyMembersProvider } from './hooks/usePartyMembers';

export const App = () => {
  const [webcamOn, setWebcamOn] = React.useState(false);

  return (
    <React.StrictMode>
      <PartyMembersProvider>
        <div className="flex flex-col h-svh">
          <Header />
          <main className="flex-grow pt-16 pb-16 bg-gray-100">
            <Chat webcamOn={webcamOn} setWebcamOn={setWebcamOn} />
          </main>
          <ActionMenu webcamOn={webcamOn} setWebcamOn={setWebcamOn} />
        </div>
      </PartyMembersProvider>
    </React.StrictMode>
  );
};
