import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './MovieCard.css'
import { ResultProvider } from './Component/contextThings';
import { ResultProvider2 } from './Component/contextTings2';


ReactDOM.createRoot(document.getElementById('root')).render(
  <ResultProvider>
  <ResultProvider2>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ResultProvider2>
  </ResultProvider>
)
