import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { ClerkProvider } from '@clerk/clerk-react'
import {createTheme} from '@mui/material';
import {ThemeProvider} from '@mui/styles';

const theme = createTheme()
const PUBLISHABLE_KEY = "pk_test_cmljaC1ibHVlZ2lsbC02MC5jbGVyay5hY2NvdW50cy5kZXYk"

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Pu")
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
    </ClerkProvider>
    <Analytics />
    <SpeedInsights />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
