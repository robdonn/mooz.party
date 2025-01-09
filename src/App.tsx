import React from 'react';
import { Chat } from './components/Chat';
import { ActionMenu } from './components/ActionMenu';
import { Header } from './components/Header';
import { PartyMembersProvider } from './hooks/usePartyMembers';
import { WebcamProvider } from './hooks/useWebcam';
import { LayoutProvider } from './hooks/useLayout';
import { TooltipProvider } from './components/ui/tooltip';
import { RulesProvider } from './hooks/useRules';
import { Welcome } from './components/Welcome';

export const App = () => {
  return (
    <React.StrictMode>
      <RulesProvider>
        <TooltipProvider>
          <LayoutProvider>
            <WebcamProvider>
              <PartyMembersProvider>
                {/* <Welcome /> */}
                <div className="flex flex-col h-svh max-h-vh">
                  <Header />
                  <main className="flex-grow flex bg-gray-100">
                    <Chat />
                  </main>
                  <ActionMenu />
                </div>
              </PartyMembersProvider>
            </WebcamProvider>
          </LayoutProvider>
        </TooltipProvider>
      </RulesProvider>
    </React.StrictMode>
  );
};
