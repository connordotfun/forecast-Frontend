import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react'

import messageStore from './stores/messageStore'
import networkStore from './stores/networkStore'
import cardExpandedStore from './stores/cardExpandedStore'

import App from './views/App';

import './index.css';
import './climacons-font.css'

const stores = {
  messageStore,
  networkStore,
  cardExpandedStore
}

ReactDOM.render(
  <Provider {...stores}><App /></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
