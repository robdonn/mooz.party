import React from 'react';
import { createRoot } from 'react-dom/client';
import './registerServiceWorker';
import { App } from './App';

import './global.css';
import './index.css';
import { createParty, initDB, readParties } from './data/db';
import { generateId } from './lib/utils/generateId';

const APP_ID = 'root';

const rootElement = document.getElementById(APP_ID);

if (!rootElement) {
  throw new Error(`Element with id ${APP_ID} not found`);
}

const root = createRoot(rootElement);

const init = async () => {
  await initDB();

  const parties = await readParties();
  if (!parties.length) {
    await createParty(generateId());
  }

  root.render(<App />);
};

init();
