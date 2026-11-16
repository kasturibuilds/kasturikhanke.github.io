import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DesignSystem from './DesignSystem';
import AIA from './AIA';
import SezzleUp from './SezzleUp';
import PDFSpaces from './PDFSpaces';
import Feedback from './Feedback';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import ProjectHero from './ProjectHero';
import './Homepage.css';
import About from './About'; // Add this import at the top with other imports

const GenerativeCaseStudy = lazy(() => import('./GenerativeCaseStudy'));
const ProjectGallery = lazy(() => import('./ProjectGallery'));
const StartupStatic = lazy(() => import('./StartupStatic'));
const WorkWithMe = lazy(() => import('./WorkWithMe'));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="portfolio-home min-h-screen overflow-y-auto bg-white text-gray-900 font-sans">
            <SiteHeader />
            <main><ProjectHero /></main>
            <SiteFooter />
          </div>
        } />
        <Route path="/receiver" element={<Suspense fallback={<p role="status">Loading…</p>}><StartupStatic /><ProjectGallery /></Suspense>} />
        <Route path="/work-with-me" element={<Suspense fallback={<p role="status">Loading…</p>}><WorkWithMe /></Suspense>} />
        <Route path="/design-system" element={<DesignSystem />} />
        <Route path="/generative-loaders" element={<Suspense fallback={<p role="status">Loading…</p>}><GenerativeCaseStudy project="loaders" /></Suspense>} />
        <Route path="/generative-charts" element={<Suspense fallback={<p role="status">Loading…</p>}><GenerativeCaseStudy project="charts" /></Suspense>} />
        <Route path="/aia" element={<AIA />} />
        <Route path="/sezzle-up" element={<SezzleUp />} />
        <Route path="/pdf-spaces" element={<PDFSpaces />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
