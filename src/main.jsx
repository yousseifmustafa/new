import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Compononts/App/App';
import"@fortawesome/fontawesome-free/css/all.min.css";
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
