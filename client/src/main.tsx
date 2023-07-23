import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; import { Provider } from 'react-redux';
import store from 'client/src/redux/store';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
