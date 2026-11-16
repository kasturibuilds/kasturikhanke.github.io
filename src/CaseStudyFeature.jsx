/* eslint-disable react/prop-types */
import { Children } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// AIA's quiet heading/content rhythm, with motion that never hides the content.
export function CaseStudyMotion({ children, className = '' }) {
  const reduceMotion = useReducedMotion();
  return <motion.div
    className={className}
    initial={{ y: reduceMotion ? 0 : 24 }}
    whileInView={{ y: 0 }}
    transition={{ duration: reduceMotion ? 0 : 0.7, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.1 }}
  >{children}</motion.div>;
}

export default function CaseStudyFeature({ id, title, children, media, after, headingLevel = 2 }) {
  const mediaBeside = Boolean(media);
  const Heading = `h${headingLevel}`;
  const copy = <div className="min-w-0 space-y-6 md:space-y-8">
    {Children.toArray(children).map((child, index) => <CaseStudyMotion key={child.key ?? index}>{child}</CaseStudyMotion>)}
  </div>;
  return <section id={id} className="relative py-10 md:py-14 scroll-mt-28">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">
      <div className={mediaBeside ? "min-w-0 space-y-6" : "min-w-0 lg:sticky lg:top-40"}>
        <CaseStudyMotion>
          <Heading className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900">{title}</Heading>
        </CaseStudyMotion>
        {mediaBeside && copy}
      </div>
      {mediaBeside ? <div className="min-w-0">{media}</div> : copy}
    </div>
    {after}
  </section>;
}
