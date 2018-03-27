import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react';
import account from './Stores/Account';
import game from './Stores/Game';

ReactDOM.render(
        <Provider account={account} game={game}>
          <App/>
        </Provider>
        , document.getElementById('root'));
registerServiceWorker();
