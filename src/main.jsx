import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import YoutubeContextProvider from './context/YotubeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <YoutubeContextProvider>
      <App />
    </YoutubeContextProvider>
  </StrictMode>,
)
