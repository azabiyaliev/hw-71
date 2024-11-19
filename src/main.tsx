import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CssBaseline/>
    <App />
  </BrowserRouter>,
  );
