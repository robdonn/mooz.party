import React from 'react';
import { Chat } from './components/Chat';
import { ActionMenu } from './components/ActionMenu';
import { Header } from './components/Header';
import { PartyMembersProvider } from './hooks/usePartyMembers';

export const App = () => {
  return (
    <React.StrictMode>
      <PartyMembersProvider>
        <div className="flex flex-col h-svh">
          <Header />
          <div className="flex-grow w-svw ">
            <Chat />
          </div>
          <ActionMenu />
        </div>
      </PartyMembersProvider>
    </React.StrictMode>
  );
};
