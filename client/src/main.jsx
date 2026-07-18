
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//Without it, every time you navigate to a new page, the browser would reload the entire website. With BrowserRouter, React changes the displayed component without refreshing the page, making your app feel like a native application.
import {BrowserRouter} from 'react-router-dom'
//clerk for authorization and authentication
import { ClerkProvider } from '@clerk/clerk-react'

createRoot(document.getElementById('root')).render(
   <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY} afterSignInUrl='/ai' afterSignUpUrl='/ai'>
    
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ClerkProvider>
)
