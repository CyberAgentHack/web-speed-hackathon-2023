import './polyfill/install';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { App } from './components/application/App';
import { injectGlobalStyle } from './global.styles';

injectGlobalStyle();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
