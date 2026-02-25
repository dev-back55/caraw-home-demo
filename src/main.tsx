
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.tsx';
import './index.css';

const CLERK_PUBLISHABLE_KEY = "pk_test_YmVsb3ZlZC1saXphcmQtOTUuY2xlcmsuYWNjb3VudHMuZGV2JA";

import { createRoot } from 'react-dom/client';

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
