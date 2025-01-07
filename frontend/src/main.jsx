import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import './styles/main.scss'
import App from './App.jsx'

/**
 * POINT D'ENTRÉE DE L'APPLI
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
