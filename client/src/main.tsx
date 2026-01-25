// client / Src / Main

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './styles/index.css'
import App from './App';
import { MeProvider } from './auth/MeProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MeProvider>
      <App />
    </MeProvider>
  </StrictMode>
);