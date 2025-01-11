import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Chat } from './components/Chat';
import { ActionMenu } from './components/ActionMenu';
import { Header } from './components/Header';
import { PartyMembersProvider } from './hooks/usePartyMembers';
import { WebcamProvider } from './hooks/useWebcam';
import { LayoutProvider } from './hooks/useLayout';
import { TooltipProvider } from './components/ui/tooltip';
import { RulesProvider } from './hooks/useRules';
import { Welcome } from './components/Welcome';

const queryClient = new QueryClient();

export const App: React.FC<{ id: string }> = ({ id }) => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RulesProvider>
          <TooltipProvider>
            <LayoutProvider>
              <WebcamProvider>
                <PartyMembersProvider id={id}>
                  <Welcome />
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
      </QueryClientProvider>
    </React.StrictMode>
  );
};
