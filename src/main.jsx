
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'



import { AppProvider } from './store/store.jsx';





createRoot(document.getElementById('root')).render(
  <AppProvider>
    <App />
    </AppProvider>
  ,
)
