import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// HashRouter, not BrowserRouter, on purpose.
//
// This ships as plain static files and has already changed homes once. Hash
// routing needs no rewrite rules and no knowledge of the mount path, so a deep
// link like /#/t/PRD-1 cannot 404 because a server directive was missed.
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import App from '@/App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </StrictMode>
);
