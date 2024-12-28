import React from 'react';
import { createRoot } from 'react-dom/client';
import './registerServiceWorker';
import { App } from './App';

import './global.css';
import './index.css';

const APP_ID = 'root';

const rootElement = document.getElementById(APP_ID);

if (!rootElement) {
  throw new Error(`Element with id ${APP_ID} not found`);
}

const root = createRoot(rootElement);

root.render(<App />);
