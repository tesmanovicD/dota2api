import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react';
import account from './Stores/Account';

ReactDOM.render(
        <Provider account={account}>
          <App/>
        </Provider>
        , document.getElementById('root'));
registerServiceWorker();
