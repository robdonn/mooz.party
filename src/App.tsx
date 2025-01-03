import React from 'react';
import { Chat } from './components/Chat';
import { ActionMenu } from './components/ActionMenu';
import { Header } from './components/Header';
import { PartyMembersProvider } from './hooks/usePartyMembers';
import { WebcamProvider } from './hooks/useWebcam';
import { LayoutProvider } from './hooks/useLayout';
import { TooltipProvider } from './components/ui/tooltip';
import { RulesProvider } from './hooks/useRules';

export const App = () => {
  return (
    <React.StrictMode>
      <RulesProvider>
        <TooltipProvider>
          <LayoutProvider>
            <WebcamProvider>
              <PartyMembersProvider>
                <div className="flex flex-col h-svh">
                  <Header />
                  <main className="flex-grow pt-16 pb-16 bg-gray-100">
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
