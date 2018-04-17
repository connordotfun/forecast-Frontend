import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react'

import messageStore from './stores/messageStore'
import socketStore from './stores/socketStore'

import App from './views/App';

import './index.css';

const stores = {
  messageStore,
  socketStore
}

ReactDOM.render(
  <Provider {...stores}><App /></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
