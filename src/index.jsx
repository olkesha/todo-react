import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { App } from './components/app';

import './styles/main.scss';

const domNode = document.querySelector('#root');
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <App title={'Hello, React!'} />
  </StrictMode>
);
