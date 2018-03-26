import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react';
import Account from './Stores/Account';

ReactDOM.render(
        <Provider>
          <App />
        </Provider>
        , document.getElementById('root'));
registerServiceWorker();
