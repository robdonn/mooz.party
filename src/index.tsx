import React from 'react';
import { createRoot } from 'react-dom/client';
import './registerServiceWorker';
import { App } from './App';

import './global.css';
import './index.css';
import { db } from './data/db';
import { generateId } from './lib/utils/generateId';

const APP_ID = 'root';

const rootElement = document.getElementById(APP_ID);

if (!rootElement) {
  throw new Error(`Element with id ${APP_ID} not found`);
}

const root = createRoot(rootElement);

const init = async () => {
  await db.init();
  await db.seedSettingsIfNotSet();

  const parties = await db.readParties();
  if (!parties.length) {
    await db.createParty(generateId());
  }

  const [party] = await db.readParties();

  root.render(<App id={party.id} />);
};

init();
