import React from 'react';
import { Chat } from './features/Chat/Chat';

export const App = () => {
  return (
    <React.StrictMode>
      <h1>Mooz Party</h1>
      <Chat />
    </React.StrictMode>
  );
};
