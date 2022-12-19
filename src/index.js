import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { AuthContextProvider } from './context/AuthContext';
import { DataContextProvider } from './context/DataContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <DataContextProvider>
    <AuthContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </AuthContextProvider>
    </DataContextProvider>
  </React.StrictMode>
);

