import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { SearchProvider } from './contexts/SearchContext';
// @ts-ignore
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ProgressProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </ProgressProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
