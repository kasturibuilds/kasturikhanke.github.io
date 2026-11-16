import StandardNavbar from './StandardNavbar';
import { SpinningLogoImage } from './SpinningLogo';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md text-gray-900 font-sans">
      <div className="site-container py-4 flex justify-between items-center">
        <a href="/" aria-label="Kasturi Khanke — Work" className="group shrink-0 py-4">
          <SpinningLogoImage />
        </a>
        <div><StandardNavbar /></div>
      </div>
    </header>
  );
}
