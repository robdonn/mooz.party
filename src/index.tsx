import React from 'react';
import { createRoot } from 'react-dom/client';

const APP_ID = 'root';

const rootElement = document.getElementById(APP_ID);

if (!rootElement) {
  throw new Error(`Element with id ${APP_ID} not found`);
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <h1>Mooz Party</h1>
  </React.StrictMode>
);
