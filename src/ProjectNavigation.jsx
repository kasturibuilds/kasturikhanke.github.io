/* eslint-disable react/prop-types */
import { projects } from './homeProjects';

const caseStudies = projects.filter(project => project.href.startsWith('/'));
const linkClass = 'inline-flex items-center justify-center min-h-11 px-3 sm:px-8 py-2 rounded-full border-2 border-black text-sm sm:text-lg font-medium hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 transition-colors';

export default function ProjectNavigation({ currentPath }) {
  const index = caseStudies.findIndex(project => project.href === currentPath);
  if (index === -1) return null;
  const previous = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return <nav aria-label="Project navigation" className="py-12 md:py-24 flex justify-between gap-3">
    <a href={previous.href} className={linkClass}>{previous.name}</a>
    <a href={next.href} className={linkClass}>{next.name}</a>
  </nav>;
}
