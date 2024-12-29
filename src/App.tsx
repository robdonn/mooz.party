import React from 'react';
import { Chat } from './components/Chat';

export const App = () => {
  return (
    <React.StrictMode>
      <div className="flex flex-col h-svh">
        <header>
          <h1 className="text-center text-lg">Mooz Party</h1>
        </header>
        <Chat />
      </div>
    </React.StrictMode>
  );
};
