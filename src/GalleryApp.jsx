import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PortfolioBoard from './PortfolioBoard';
import { projectModules } from './projectModules';

const ProjectGallery = lazy(() => import('./ProjectGallery'));
const About = lazy(() => import('./About'));
const AIA = lazy(projectModules.assistant);
const PDFSpaces = lazy(projectModules.spaces);
const SezzleUp = lazy(projectModules.sezzle);
const WorkWithMe = lazy(() => import('./WorkWithMe'));
const StartupStatic = lazy(() => import('./StartupStatic'));
const pageTitles = {
  '/': 'Kasturi Khanke — Product Designer & Builder',
  '/about': 'About Kasturi Khanke — Product Designer & Builder',
  '/work-with-me': 'Work with Kasturi Khanke — Product Design & AI',
  '/aia': 'Adobe AI Assistant — Kasturi Khanke',
  '/pdf-spaces': 'Adobe PDF Spaces — Kasturi Khanke',
  '/sezzle-up': 'Sezzle Up — Kasturi Khanke',
  '/receiver': 'Receiver — Kasturi Khanke',
};
function RouteTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/$/, '') || '/';
    document.title = pageTitles[path] || 'Page not found — Kasturi Khanke';
  }, [pathname]);
  return null;
}
function NotFound() {
  return <main className="route-message"><p>404 / Page not found</p><h1>Let’s get you back to the work.</h1><Link to="/">View portfolio →</Link></main>;
}
export default function GalleryApp() {
  return <BrowserRouter><RouteTitle /><Suspense fallback={<div className="route-message" role="status">Loading…</div>}><Routes>
    <Route path="/" element={<PortfolioBoard />} />
    <Route path="/receiver" element={<><StartupStatic /><ProjectGallery /></>} />
    <Route path="/work-with-me" element={<WorkWithMe />} />
    <Route path="/pdf-spaces" element={<PDFSpaces />} />
    <Route path="/aia" element={<AIA />} />
    <Route path="/sezzle-up" element={<SezzleUp />} />
    <Route path="/design-system" element={<Navigate to="/" replace />} />
    <Route path="/feedback" element={<Navigate to="/" replace />} />
    <Route path="/about" element={<About />} />
    <Route path="/ic" element={<Navigate to="/" replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes></Suspense></BrowserRouter>;
}
