import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@fontsource-variable/noto-sans-arabic/index.css';
import './index.css'
import App from './App.jsx'
import { RootLayout } from './pages/rootLayout.jsx';
import { ThemeProvider } from './contexts/DarkModeContext.jsx';
import { OfficialFiles } from './pages/officialfiles.jsx';
import { SidebarHelper } from './axiosServices/sidebarhelper.jsx';
import { SecretReviewPage } from './pages/secretreviewpage.jsx';
import { LandingPage } from './pages/landingPage.jsx';
import { NationalStandards } from './pages/nationalStandards.jsx';
import { NotFound } from './pages/notFound.jsx';
import { LessonPlan } from './pages/lessonPlan.jsx';

document.documentElement.lang = 'ar';
document.documentElement.dir = 'rtl';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route element={<SidebarHelper/>}>
            <Route path="/chat" element={<App />}/>
            <Route path="/files" element={<OfficialFiles/>} />
            <Route path="/reviews" element={<SecretReviewPage/>} />
            <Route path="/standards" element={<NationalStandards/>} />
            <Route path="/lesson-plan" element={<LessonPlan/>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);