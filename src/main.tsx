import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <CssBaseline/>
      <App />
    </BrowserRouter>
  </Provider>,
  );
