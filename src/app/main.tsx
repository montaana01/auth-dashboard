import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { UserPage } from "../pages/users/UserPage.tsx";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth" element={<App />} />
      <Route path="/users" element={<UserPage />} />
    </Routes>
  </BrowserRouter>,
);
