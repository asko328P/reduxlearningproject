import React from 'react';
import { Provider } from 'react-redux';
import store from './configureStore';
import { createRoot } from 'react-dom/client';

import App from './components/App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
